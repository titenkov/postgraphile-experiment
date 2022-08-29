const path = require("path");
const { readFileSync, existsSync } = require("fs");
const db = require('./db')
const schemaValidator = require("./utils/schemaValidator")

const readFileContent = () => {
  const absolutePath = path.join(process.env.PWD, 'init.json');

  if (!existsSync(absolutePath)) {
    return;
  }

  try {
    const jsonString = readFileSync(absolutePath, 'utf-8');
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to perform init script", e);
  }
}

module.exports = async () => {
  const content = readFileContent();

  if (!content) {
    return;
  }

  console.info('Starting initialization...');

  if (!schemaValidator(content)) {
    console.warn("Invalid schema format. Skipping...", schemaValidator.errors);
    return;
  }

  try {
    const projects = content.projects.map(p => ({ id: p.id }));
    const templates = content.projects.flatMap(p =>
      p.templates ? p.templates.map(t => ({ type: t.type, locale: t.locale, content: t.content, project_id: p.id })) : []
    );

    const isolationLevel = 'read uncommitted';
    const trx = await db.transaction({ isolationLevel });

    try {
      const projectsRes = await trx('projects').returning('id').insert(projects).onConflict(['id']).ignore()
      let templatesRes

      if (templates && !!templates.length) {
        templatesRes = await trx('templates')
          .returning(['project_id', 'type', 'locale', 'content'])
          .insert(templates)
          .onConflict(['type', 'locale', 'project_id']).merge(['content'])
          .whereRaw("templates.content != excluded.content");
      }

      await trx.commit();

      console.info('Initialization file has been successfully applied.\n');

      if (projectsRes && !!projectsRes.length) {
        console.info('Projects: ');
        console.table(projectsRes, ["id"]);
      }

      if (templatesRes && !!templatesRes.length) {
        console.info('Templates: ');
        console.table(templatesRes, ["project_id", "type", "locale", "content"]);
      }
    } catch (e) {
      await trx.rollback();
      console.error("Initialization failed due to the error: ", e);
    }

  } catch (error) {
    console.error(error);
  }
}

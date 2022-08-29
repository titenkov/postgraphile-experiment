const Ajv = require("ajv")

const ajv = new Ajv()

const templateSchema = {
  type: "object",
  properties: {
    type: { type: "string"},
    locale: { type: "string"},
    content: { type: "string"},
  },
  required: ["type", "locale", "content"],
  additionalProperties: true
}

const projectSchema = {
  type: "object",
  properties: {
    id: { type: "string"},
    templates: {
      type: "array",
      "items" : templateSchema
    }
  },
  required: ["id"],
  additionalProperties: true
}

const schema = {
  type: "object",
  properties: {
    projects: {
      type: "array",
      minItems: 1,
      "items" : projectSchema
    },
  },
  required: ["projects"],
  additionalProperties: true
}

module.exports = ajv.compile(schema)

This file contains guidelines that should be followed when making any
changes to the repository.

# The basics

This repository is using Trunk Based Development approach - a branching 
model that focuses on collaborating through a single `main` branch. Read more about Trunk Based Development - 
[https://trunkbaseddevelopment.com](https://trunkbaseddevelopment.com).

## Every `main` branch commit  is releasable

Code in `main` branch should be releasable at any point of time. If you're introducing 
any breaking changes, ensure they are hidden under the feature toggles.

## Ensure the quality of the code before pushing it to the `main`

You need to verify that the code follows the guidelines, all tests are passed
before you push any changes to `main`. Your code should also be covered with automated tests.

## Fix the build of `main` branch immediately or revert the change

Sometimes build can fail after you pushed your changes directly into main. You need to either fix the build immediately 
or revert your changes, so that you do not block others.

# Pull requests

The repository uses "Ship/Show/Ask" pull request strategy 
([https://martinfowler.com/articles/ship-show-ask.html](https://martinfowler.com/articles/ship-show-ask.html)).

## Ship

If you want to make a change, which is small and obvious, doesn't require
code review or mention in automatic release notes - push it directly to `main`. 

## Show

If you want to make a change, which doesn't require code review, but worth mentioning
in automatic release notes or other developers be aware of - push it to your branch, open a pull request 
and merge it without waiting for a review. You’ll want to wait for your automated checks (tests, code coverage, etc.), 
but you don’t wait for anyone’s feedback.

## Ask

If you want to make a change, which you're not fully confident in or have some related questions -
push it to your branch, open a pull request and wait for feedback. Maybe you're not sure you’ve taken the right approach. 
Maybe there’s some code you’re not quite happy with but you’re unsure how to improve it. 
Maybe you’ve done an experiment and want to see what people think.

## The rules

- Approvals are not required to merge the pull request
- People get to merge their own pull requests
- Make use of CI/CD techniques to keep `main` releasable (f.e. feature toggles)
- Branches and pull requests should not live long and should rebase on `main` often
- Strive to small and self-contained pull requests

# Releases

Release can be made from any commit on the `main` branch. In order to make a release, you need to bump the version and push the tag.

After that you can go to the `releases` and see the draft-release, generated automatically from the merged pull-requests history. Feel free to
edit it and publish.

## Versioning

The repository is using semantic versioning ([https://semver.org/](https://semver.org/)).

Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards compatible manner, and
PATCH version when you make backwards compatible bug fixes.


# Git hygiene

To ensure we have a readable history in our Git repositories we try to follow some basic principles when working with Git.

## Break changes into logical commits

A commit should be self-contained and tell a story.

## Keep changes that refactor code in their own commits

This allows reviewers to understand your changes in context.

## Rebase and avoid merge-commits

Continually rebase your branch, and avoid merge-commits. Ensure you are
always up to date with the base branch by rebasing frequently. By doing
this you ensure that your changes work and integrates well with the
latest changes in the base repository.

If you have accidentally merged, learn how to modify your branch history
and create a clean rebased history.

## Give branches meaningful names

Feature branch name format should follow this convention:
```
<type>/<short-description>

F.e. 
docs/contribution-guide
chore/fix-artifact-publishing
```

Type

Should be one of the following:

* **chore**: End-user not noticible change (f.e. CI/build changes or tests)
* **docs**: Documentation change
* **feature**: A new feature
* **defect**: A bug fix
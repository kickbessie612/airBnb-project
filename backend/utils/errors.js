// error when authentication failed
// the current user does not have the correct role(s) or permission(s)

class ForbiddenError extends Error {
  constructor() {
    super('Forbidden');
    this.title = 'Forbidden';
    this.errors = ['Forbidden'];
    this.status = 403;
  }
}

// error when can't find the specific resource(spot, spot image..etc)
class NotFoundError extends Error {
  constructor(name = 'resource') {
    super(`${name} couldn't be found`);
    this.title = `${name} couldn't be found`;
    this.errors = [`${name} couldn't be found`];
    this.status = 404;
  }
}

module.exports = { ForbiddenError, NotFoundError };

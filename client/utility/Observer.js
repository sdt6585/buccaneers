(function () {
  class Observer {
    constructor(options) {
      this.handlers = {};
    }

    //Register an event - can and should be async functions unless purely procedural
    on (eventName, fn, options = {}) {
      if (!Array.isArray(this.handlers[eventName])) {
        this.handlers[eventName] = [];
      }

      this.handlers[eventName].push({
        fn: fn,
        options: options
      });
    }

    once (eventName, fn) {
      this.on(eventName, fn, {once: true});
    }

    off (eventName, fn) {
      this.handlers[eventName] = _.remove(this.handlers[eventName], function (eventFunction) {
        eventFunction === fn;
      });
    }

    hasEvents (eventName) {
      return typeof this.handlers[eventName] === 'object' && this.handlers[eventName].length > 0;
    }

    async emit (eventName, options) {
      //Make sure we have handlers
      if (!Array.isArray(this.handlers[eventName])) {
        return options;
      }

      //Make options null if blank so we can halt processing on undefined returns
      if (typeof options === 'undefined') {
        options = null;
      }

      //Go through each registered handler and pass the values as an options parameter
      for (let handleIndex = 0; handleIndex < this.handlers[eventName].length; handleIndex++) {
        let handler = this.handlers[eventName][handleIndex];

        //Call each function and check return value - return value of undefined signals to halt the loop
        let checkBreak = await handler.fn(options);
        if (typeof checkBreak === 'undefined') {
          break;
        }
        //Set options to the return value if we didn't get a break signal for the next function to mutate it
        options = checkBreak;

        //Check setting in options if the handler should be deleted after first run
        if (typeof handler.options === 'object' && handler.options.once === true) {
          delete this.handlers[eventName][handleIndex];
        }
      }

      //Return the potentially mutated options parameter
      return options;
    }
  }

  return Observer;
})();

import Ember from 'ember';

const { Component, observer, merge } = Ember;

export default Component.extend({
  tagName           : 'div',
  classNames        : ['ui', 'modal'],
  classNameBindings : ['isFullScreen:fullscreen', 'isSmall:small', 'isLarge:large'],

  openObserver: observer('isOpen', function() {
    if (this.get('isOpen')) {
      this.$().modal('show');
    } else {
      this.$().modal('hide');
    }
  }),

  didInsertElement() {
    const defaultOptions = {
      dimmerSettings: {
        variation: 'inverted'
      },
      onHide: () => {
        this.set('isOpen', false);
        if (this.get('onHide')) {
          this.get('onHide')();
        }
      },
      onVisible: () => {
        this.set('isOpen', true);
        this.$('[data-content]').popup({
          inline: true
        });
        if (this.get('onVisible')) {
          this.get('onVisible')();
        }
      }
    };
    const options = this.get('options') ? merge(defaultOptions, this.get('options')) : defaultOptions;

    this.$().modal(options);

    if (this.get('isOpen')) {
      this.$().modal('show');
    }
  }
});
Array.prototype.first = function() {
  return this.at(0);
};

Array.prototype.last = function() {
  return this.at(-1);
};

Array.prototype.size = function() {
  return JSON.stringify(this).length;
};

// Credit: https://stackoverflow.com/a/24137301/1544937
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

// Credit: https://stackoverflow.com/a/53606357/1544937
Array.prototype.subset = function(array) {
  return this.every(function(val) {
    return array.includes(val);
  });
};

// Credit: https://stackoverflow.com/a/57067151/1544937
Array.prototype.exclude = function(condition, item) {
  var count, element, i, index, len, ref;
  count = 0;
  ref = this;
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    element = ref[index];
    if (!condition.call(item, element, index, this)) {
      if (index !== count) {
        this[count] = element;
      }
      count++;
    }
  }
  this.length = count;
  return this;
};
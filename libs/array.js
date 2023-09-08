Array.prototype.first = function() {
  return this.at(0);
};

Array.prototype.last = function() {
  return this.at(-1);
};

Array.prototype.clear = function() {
  return this.length = 0;
};

Array.prototype.empty = function() {
  return this.length === 0;
};

Array.prototype.boolean = function() {
  return Boolean(this.length);
};

Array.prototype.number = function() {
  return Number(this);
};

Array.prototype.string = function() {
  return String(this);
};

Array.prototype.array = function() {
  return Array(this);
};

Array.prototype.object = function() {
  return Object(this);
};

Array.prototype.min = function(numeric = true) {
  if (numeric) {
    return Math.min.apply(null, this.numeric());
  } else {
    return this.sort().first();
  }
};

Array.prototype.max = function(numeric = true) {
  if (numeric) {
    return Math.max.apply(null, this.numeric());
  } else {
    return this.sort().last();
  }
};

Array.prototype.absMin = function(numeric = true) {
  if (numeric) {
    return Math.min.apply(null, this.numeric().map(Math.abs));
  } else {
    return this.sort().first();
  }
};

Array.prototype.absMax = function(numeric = true) {
  if (numeric) {
    return Math.max.apply(null, this.numeric().map(Math.abs));
  } else {
    return this.sort().last();
  }
};

// Credit: https://stackoverflow.com/a/10757602/1544937
// Credit: https://stackoverflow.com/a/20070691/1544937
Array.prototype.unique = function() {
  return Array.from(new Set(this));
};

// Credit: https://stackoverflow.com/a/53606357/1544937
Array.prototype.subset = function(array) {
  return this.every(function(item) {
    return array.includes(item);
  });
};

// Credit: https://stackoverflow.com/a/24137301/1544937
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

// Credit: https://stackoverflow.com/a/70669834/1544937
Array.prototype.numeric = function(cast = true) {
  var numeric;
  numeric = this.filter(function(item) {
    return /^-?\d+\.?\d*$/.test(item);
  });
  if (cast) {
    return numeric.map(Number);
  } else {
    return numeric;
  }
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
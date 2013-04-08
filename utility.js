var Utility = new function(){
  var self = this;

  self.getRandom = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  self.sample = function(arr){
    return arr[~~(Math.random() * this.length)];
  }
}
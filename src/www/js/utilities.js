export const getObjectByName = function(arr,name) {
  let i = 0;
  for (i in arr) {
    if ('name' in arr[i]) {
      if (arr[i].name === name) {
        return arr[i];
      }
    }
   }
  return false;
};

export const countItemInArray = function(arr,item) {
  let l = arr.length;
  let i = 0;
  let count = 0;
  let arrSort = arr.sort();

  for (i = 0; i < l; i += 1) {
    if (arrSort[i] === item) {
      count += 1;
    } else if (count > 0) {
      break;
    }
  }

  return count;
}

export const titleCase = function(str) {
  str = str.replace(/_/gi,' ');
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  str = str.join(' ').replace(/Of/gi, 'of');
  str = str.replace(/The/gi, 'the');
  str = str.replace(/In/gi, 'in');
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

export const getModifier = function(score) {

  const score_chart = {
    0:"",
    1:"-5",
    2:"-4",
    3:"-4",
    4:"-3",
    5:"-3",
    6:"-2",
    7:"-2",
    8:"-1",
    9:"-1",
    10:"+0",
    11:"+0",
    12:"+1",
    13:"+1",
    14:"+2",
    15:"+2",
    16:"+3",
    17:"+3",
    18:"+4",
    19:"+4",
    20:"+5",
    21:"+5",
    22:"+6",
    23:"+6",
    24:"+7",
    25:"+7",
    26:"+8",
    27:"+8",
    29:"+9",
    29:"+9",
    30:"+10"
  }

  return score_chart[score];
};

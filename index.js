import * as ReactDOMServer from 'react-dom/server';
import $ from 'jquery';

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

//x,y,dip

export async function DownloadUrl(url, name) {
  fetch(url, {
    mode: 'no-cors'
  }).then(resp => resp.blob()).then(blob => {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }).catch(() => alert('oh no!'));
}
export async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}
export function FileToBase64(file, callback) {
  const fileReader = new FileReader();
  fileReader.onload = () => callback(fileReader.result);
  fileReader.readAsDataURL(file);
}
export function HandleBackButton(callback = () => {}) {
  window.history.pushState({}, '');
  window.history.pushState({}, '');
  window.onpopstate = function (event) {
    window.history.pushState({}, '');
    callback();
  };
}
export function GetClient(e) {
  return 'ontouchstart' in document.documentElement && e.changedTouches ? {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY
  } : {
    x: e.clientX,
    y: e.clientY
  };
}
export function ExportToExcel(rows, config = {}) {
  let {
    promptText = 'Inter Excel File Name'
  } = config;
  let o = {
    fixPersianAndArabicNumbers(str) {
      if (typeof str !== 'string') {
        return str;
      }
      var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
      return str;
    },
    getJSON(rows) {
      let result = [];
      for (let i = 0; i < rows.length; i++) {
        let json = rows[i],
          fixedJson = {};
        for (let prop in json) {
          fixedJson[prop] = this.fixPersianAndArabicNumbers(json[prop]);
        }
        result.push(fixedJson);
      }
      return result;
    },
    export() {
      let name = window.prompt(promptText);
      if (!name || name === null || !name.length) return;
      var data = this.getJSON(rows);
      var arrData = typeof data != "object" ? JSON.parse(data) : data;
      var CSV = "";
      // CSV += 'title';
      CSV += '\r\n\n';
      if (true) {
        let row = "";
        for (let index in arrData[0]) {
          row += index + ",";
        }
        row = row.slice(0, -1);
        CSV += row + "\r\n";
      }
      for (var i = 0; i < arrData.length; i++) {
        let row = "";
        for (let index in arrData[i]) {
          row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + "\r\n";
      }
      if (CSV === "") {
        alert("Invalid data");
        return;
      }
      var fileName = name.replace(/ /g, "_");
      var universalBOM = "\uFEFF";
      var uri = "data:text/csv;charset=utf-8," + encodeURIComponent(universalBOM + CSV);
      var link = document.createElement("a");
      link.href = uri;
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return o.export();
}
export function SplitNumber(price, count, splitter) {
  if (!price) {
    return '';
  }
  count = count || 3;
  splitter = splitter || ',';
  let str = price.toString();
  let dotIndex = str.indexOf('.');
  if (dotIndex !== -1) {
    str = str.slice(0, dotIndex);
  }
  let res = '';
  let index = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    res = str[i] + res;
    if (index === count - 1) {
      index = 0;
      if (i > 0) {
        res = splitter + res;
      }
    } else {
      index++;
    }
  }
  return res;
}
export function EventHandler(selector, event, action, type = 'bind') {
  var me = {
    mousedown: "touchstart",
    mousemove: "touchmove",
    mouseup: "touchend"
  };
  let touch = ('ontouchstart' in document.documentElement);
  event = touch ? me[event] : event;
  var element = typeof selector === "string" ? selector === "window" ? $(window) : $(selector) : selector;
  element.unbind(event, action);
  if (type === 'bind') {
    element.bind(event, action);
  }
}
export function getValueByStep({
  value,
  start,
  step,
  end
}) {
  let res = Math.round((value - start) / step) * step + start;
  if (res < start) {
    res = start;
  }
  if (res > end) {
    res = end;
  }
  return res;
}
export function URLToJSON(url) {
  try {
    return JSON.parse(`{"${decodeURI(url.split('?')[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
  } catch {
    return {};
  }
}
export function JSXToHTML(jsx) {
  return ReactDOMServer.renderToStaticMarkup(jsx);
}
export async function Copy(text) {
  window.navigator.clipboard.writeText(text);
}
export function IsTouch() {
  return "ontouchstart" in document.documentElement;
}
export async function Paste() {
  try {
    return window.navigator.clipboard.read();
  } catch (err) {
    console.log(err.message);
  }
}
export function Search(items, searchValue, getValue = o => o) {
  if (!searchValue) {
    return items;
  }
  function isMatch(keys, value) {
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (value.indexOf(key) === -1) {
        return false;
      }
    }
    return true;
  }
  let keys = searchValue.split(' ');
  return items.filter((o, i) => isMatch(keys, getValue(o, i)));
}
export function GenerateComponsition({
  level: maxLevel = 4,
  length = 4,
  childsField = 'childs',
  fields = {}
}) {
  let $$ = {
    generate(level = 0, index = '') {
      if (level >= maxLevel) {
        return [];
      }
      let res = [];
      for (let i = 0; i < length; i++) {
        let newIndex = index + '-' + i;
        let newItem = {
          id: 'aa' + Math.round(Math.random() * 10000),
          [childsField]: $$.generate(level + 1, newIndex)
        };
        for (let prop in fields) {
          newItem[prop] = fields[prop] + index;
        }
        res.push(newItem);
      }
      return res;
    }
  };
  return $$.generate();
}
export function CalculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
export function getEventAttrs(eventType, callback) {
  let touch = IsTouch();
  let fixedEvent;
  if (touch) {
    fixedEvent = {
      'onMouseDown': 'onTouchStart',
      'onMouseMove': 'onTouchMove',
      'onMouseUp': 'onTouchEnd'
    }[eventType];
  } else {
    fixedEvent = eventType;
  }
  return {
    [fixedEvent]: callback
  };
}
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
export function JsonValidator(json, schema) {
  let $$ = {
    getType(v) {
      if (['string', 'number', 'boolean', 'array', 'object', 'null', 'undefined'].indexOf(v) !== -1) {
        return v;
      }
      if (Array.isArray(v)) {
        return 'array';
      }
      return typeof v;
    },
    getSchemaTypes(s) {
      if (typeof s === 'string' && s.indexOf('|') !== -1) {
        return s.split('|');
      }
      return [s];
    },
    compaire(data, schema, propName) {
      const schemaTypes = this.getSchemaTypes(schema);
      let type = this.getType(data);
      let isMatch = false;
      for (let i = 0; i < schemaTypes.length; i++) {
        let st = schemaTypes[i];
        if (['string', 'number', 'boolean', 'array', 'object', 'null', 'undefined'].indexOf(st) !== -1) {
          if (type === st) {
            isMatch = true;
          }
        } else if (typeof st === 'object') {
          if (type === this.getType(st)) {
            isMatch = true;
          }
        } else {
          if (data === st) {
            isMatch = true;
          }
        }
      }
      if (!isMatch) {
        return `${propName} must be ${schemaTypes.join(' or ')}`;
      }
    },
    validate(data, schema, propName = 'data') {
      let compaireResult = this.compaire(data, schema, propName);
      if (compaireResult) {
        return compaireResult;
      }
      if (typeof schema === 'object') {
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            let d = data[i];
            let s = schema[i] || schema[0];
            let res = this.validate(d, s, `${propName}[${i}]`);
            if (res) {
              return res;
            }
          }
        } else {
          for (let prop in data) {
            let d = data[prop];
            let s = schema[prop];
            let res = this.validate(d, s, `${propName}.${prop}`);
            if (res) {
              return res;
            }
          }
          for (let prop in schema) {
            let d = data[prop];
            let s = schema[prop];
            let res = this.validate(d, s, `${propName}.${prop}`);
            if (res) {
              return res;
            }
          }
        }
      }
    }
  };
  return $$.validate(json, schema);
}
export class Swip {
  constructor(p) {
    _defineProperty(this, "p", void 0);
    _defineProperty(this, "geo", void 0);
    _defineProperty(this, "timeout", void 0);
    _defineProperty(this, "count", void 0);
    _defineProperty(this, "domLimit", void 0);
    _defineProperty(this, "parentLimit", void 0);
    _defineProperty(this, "getDom", void 0);
    _defineProperty(this, "getParent", void 0);
    _defineProperty(this, "init", void 0);
    _defineProperty(this, "dx", void 0);
    _defineProperty(this, "dy", void 0);
    _defineProperty(this, "cx", void 0);
    _defineProperty(this, "cy", void 0);
    _defineProperty(this, "dist", void 0);
    _defineProperty(this, "so", void 0);
    _defineProperty(this, "getPercentByValue", void 0);
    _defineProperty(this, "getMousePosition", void 0);
    _defineProperty(this, "click", void 0);
    _defineProperty(this, "mouseDown", void 0);
    _defineProperty(this, "mouseMove", void 0);
    _defineProperty(this, "mouseUp", void 0);
    _defineProperty(this, "getDOMLimit", void 0);
    _defineProperty(this, "change", void 0);
    _defineProperty(this, "getPage", void 0);
    _defineProperty(this, "isMoving", void 0);
    _defineProperty(this, "centerAngle", void 0);
    this.p = p;
    this.geo = new Geo();
    this.timeout = undefined;
    this.count = 0;
    this.getDom = () => p.dom();
    this.getParent = () => p.parent();
    this.dx = 0;
    this.dy = 0;
    this.cx = 0;
    this.cy = 0;
    this.dist = 0;
    this.isMoving = false;
    this.centerAngle = 0;
    this.init = () => {
      this.count++;
      if (this.count > 10) {
        clearTimeout(this.timeout);
        return;
      }
      let res = this.getDom();
      if (!res.length) {
        this.timeout = setTimeout(() => this.init(), 400);
      } else {
        clearTimeout(this.timeout);
        EventHandler(this.getDom(), 'mousedown', $.proxy(this.mouseDown, this));
        if (p.onClick) {
          EventHandler(this.getDom(), 'click', $.proxy(this.click, this));
        }
      }
    };
    this.getPercentByValue = (value, start, end) => {
      return 100 * (value - start) / (end - start);
    };
    this.getPage = () => {
      let {
        page
      } = this.p;
      return page ? page() : $(window);
    };
    this.getMousePosition = e => {
      this.domLimit = this.getDOMLimit('dom');
      let page = this.getPage();
      let st = page.scrollTop();
      let sl = page.scrollLeft();
      let client = GetClient(e),
        x = client.x - this.domLimit.left + sl,
        y = client.y - this.domLimit.top + st;
      let xp = this.getPercentByValue(x, 0, this.domLimit.width),
        yp = this.getPercentByValue(y, 0, this.domLimit.height);
      let centerAngle = this.geo.getAngle([[this.domLimit.centerX, this.domLimit.centerY], [client.x, client.y]]);
      let res = {
        xp,
        yp,
        clientX: client.x,
        clientY: client.y,
        x,
        y,
        centerAngle
      };
      return res;
    };
    this.getDOMLimit = type => {
      let dom = type === 'dom' ? this.getDom() : this.getParent();
      let offset = dom.offset();
      let DOM = {
        width: dom.width(),
        height: dom.height(),
        left: offset.left,
        top: offset.top,
        centerX: 0,
        centerY: 0
      };
      return {
        ...DOM,
        centerX: DOM.left + DOM.width / 2,
        centerY: DOM.top + DOM.height / 2,
        right: DOM.left + DOM.width,
        bottom: DOM.top + DOM.height
      };
    };
    this.click = e => {
      //jeloye click bad az drag ro bayad begirim choon click call mishe 
      if (this.isMoving) {
        console.log('prevent click after move');
        return;
      }
      this.domLimit = this.getDOMLimit('dom');
      this.parentLimit = p.parent ? this.getDOMLimit('parent') : undefined;
      let mousePosition = this.getMousePosition(e);
      let clickParams = {
        mousePosition,
        domLimit: this.domLimit,
        parentLimit: this.parentLimit,
        event: e
      };
      p.onClick(clickParams);
    };
    this.mouseDown = e => {
      this.isMoving = false;
      this.domLimit = this.getDOMLimit('dom');
      this.parentLimit = p.parent ? this.getDOMLimit('parent') : undefined;
      let mousePosition = this.getMousePosition(e);
      this.centerAngle = mousePosition.centerAngle;
      this.cx = mousePosition.clientX;
      this.cy = mousePosition.clientY;
      this.so = {
        client: {
          x: mousePosition.clientX,
          y: mousePosition.clientY
        }
      };
      let startParams = {
        mousePosition,
        domLimit: this.domLimit,
        parentLimit: this.parentLimit,
        event: e
      };
      let res = (p.start || (() => [0, 0]))(startParams);
      if (!Array.isArray(res)) {
        return;
      }
      let x = res[0],
        y = res[1];
      this.so = {
        ...this.so,
        x,
        y
      };
      EventHandler('window', 'mousemove', $.proxy(this.mouseMove, this));
      EventHandler('window', 'mouseup', $.proxy(this.mouseUp, this));
    };
    this.mouseMove = e => {
      let {
        speedX = 1,
        speedY = 1,
        stepX = 1,
        stepY = 1,
        reverseX,
        reverseY,
        insideX,
        insideY
      } = this.p;
      let mousePosition = this.getMousePosition(e),
        client = GetClient(e);
      let dx = client.x - this.cx,
        dy = client.y - this.cy;
      dx = Math.round(dx * speedX) * (reverseX ? -1 : 1);
      dy = Math.round(dy * speedY) * (reverseY ? -1 : 1);
      let deltaCenterAngle = mousePosition.centerAngle - this.centerAngle;
      //if(deltaCenterAngle < 0){deltaCenterAngle += 360}
      if (typeof stepX === 'number') {
        dx = Math.round(dx / stepX) * stepX;
      }
      if (typeof stepY === 'number') {
        dy = Math.round(dy / stepY) * stepY;
      }
      if (dx === this.dx && dy === this.dy) {
        return;
      }
      this.isMoving = true;
      this.dx = dx;
      this.dy = dy;
      this.dist = Math.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
      let angle = this.geo.getAngle([[this.cx, this.cy], [client.x, client.y]]);
      let x, y;
      if (this.so.x !== undefined && this.so.y !== undefined) {
        x = this.so.x + dx;
        y = this.so.y + dy;
        let {
          minX,
          minY,
          maxX,
          maxY
        } = this.p;
        if (minX !== undefined && x < minX) {
          x = minX;
        }
        if (maxX !== undefined && x > maxX) {
          x = maxX;
        }
        if (minY !== undefined && y < minY) {
          y = minY;
        }
        if (maxY !== undefined && y > maxY) {
          y = maxY;
        }
      }
      if (stepX === true) {
        x = Math.round(x / this.domLimit.width) * this.domLimit.width;
      }
      if (stepY === true) {
        y = Math.round(y / this.domLimit.height) * this.domLimit.height;
      }
      if (insideX) {
        if (this.parentLimit) {
          if (x > this.parentLimit.width - this.domLimit.width) {
            x = this.parentLimit.width - this.domLimit.width;
          }
          if (x < 0) {
            x = 0;
          }
        } else {
          alert('Swip error => you set insideX prop but missing parent props');
        }
      }
      if (insideY) {
        if (this.parentLimit) {
          if (y > this.parentLimit.height - this.domLimit.height) {
            y = this.parentLimit.height - this.domLimit.height;
          }
          if (y < 0) {
            y = 0;
          }
        } else {
          alert('Swip error => you set insideY prop but missing parent props');
        }
      }
      this.change = {
        x,
        y,
        dx,
        dy,
        dist: this.dist,
        angle,
        deltaCenterAngle
      };
      let p = {
        change: this.change,
        mousePosition,
        domLimit: this.domLimit,
        parentLimit: this.parentLimit,
        event: e
      };
      if (this.p.move) {
        this.p.move(p);
      }
    };
    this.mouseUp = e => {
      EventHandler('window', 'mousemove', this.mouseMove, 'unbind');
      EventHandler('window', 'mouseup', this.mouseUp, 'unbind');
      //chon click bad az mouseUp call mishe mouseUp isMoving ro zoodtar false mikone (pas nemitoone jeloye click bad az harekat ro begire), pas bayad in amal ba yek vaghfe anjam beshe
      //jeloye clicke bad az harekat ro migirim ta bad az drag kardan function click call nashe
      setTimeout(() => this.isMoving = false, 10);
      let mousePosition = this.getMousePosition(e);
      let p = {
        change: this.change,
        event: e,
        domLimit: this.domLimit,
        parentLimit: this.parentLimit,
        mousePosition
      };
      if (this.p.end) {
        this.p.end(p);
      }
    };
    this.init();
  }
}
export class AIODate {
  constructor() {
    _defineProperty(this, "isMatch", void 0);
    _defineProperty(this, "convertToArray", void 0);
    _defineProperty(this, "isAny", void 0);
    _defineProperty(this, "isLess", void 0);
    _defineProperty(this, "isGreater", void 0);
    _defineProperty(this, "isEqual", void 0);
    _defineProperty(this, "isBetween", void 0);
    _defineProperty(this, "getWeekDay", void 0);
    _defineProperty(this, "isJalali", void 0);
    _defineProperty(this, "getWeekDays", void 0);
    _defineProperty(this, "toGregorian", void 0);
    _defineProperty(this, "toJalali", void 0);
    _defineProperty(this, "pattern", void 0);
    _defineProperty(this, "get2Digit", void 0);
    _defineProperty(this, "getMonths", void 0);
    _defineProperty(this, "getSplitter", void 0);
    _defineProperty(this, "getTime", void 0);
    _defineProperty(this, "getNextTime", void 0);
    _defineProperty(this, "getMonthDaysLength", void 0);
    _defineProperty(this, "getYearDaysLength", void 0);
    _defineProperty(this, "getDaysOfWeek", void 0);
    _defineProperty(this, "getDatesBetween", void 0);
    _defineProperty(this, "getDelta", void 0);
    _defineProperty(this, "convertMiliseconds", void 0);
    _defineProperty(this, "getDaysOfMonth", void 0);
    _defineProperty(this, "getLastDayOfMonth", void 0);
    _defineProperty(this, "getDateByPattern", void 0);
    _defineProperty(this, "getToday", void 0);
    _defineProperty(this, "getDayIndex", void 0);
    this.isMatch = (date, matchers) => {
      date = this.convertToArray(date);
      for (let i = 0; i < matchers.length; i++) {
        let matcher = matchers[i],
          type,
          targets;
        try {
          let a = matcher.split(',');
          type = a[0];
          targets = a.slice(1, a.length);
        } catch {
          return false;
        }
        if (type === '<') {
          for (let i = 0; i < targets.length; i++) {
            if (this.isLess(date, targets[i])) {
              return true;
            }
          }
        } else if (type === '>') {
          for (let i = 0; i < targets.length; i++) {
            if (this.isGreater(date, targets[i])) {
              return true;
            }
          }
        } else if (type === '<=') {
          for (let i = 0; i < targets.length; i++) {
            if (this.isEqual(date, targets[i])) {
              return true;
            }
            if (this.isLess(date, targets[i])) {
              return true;
            }
          }
        } else if (type === '>=') {
          for (let i = 0; i < targets.length; i++) {
            if (this.isEqual(date, targets[i])) {
              return true;
            }
            if (this.isGreater(date, targets[i])) {
              return true;
            }
          }
        } else if (type === '=') {
          for (let i = 0; i < targets.length; i++) {
            if (this.isEqual(date, targets[i])) {
              return true;
            }
          }
        } else if (type === '!=') {
          for (let i = 0; i < targets.length; i++) {
            if (!this.isEqual(date, targets[i])) {
              return true;
            }
          }
        } else if (type === '<>') {
          if (targets[0] && targets[1]) {
            let start, end;
            if (this.isLess(targets[0], targets[1])) {
              start = targets[0];
              end = targets[1];
            } else {
              start = targets[1];
              end = targets[0];
            }
            if (this.isGreater(date, start) && this.isLess(date, end)) {
              return true;
            }
          }
        } else if (type === '<=>') {
          if (targets[0] && targets[1]) {
            let start, end;
            if (this.isLess(targets[0], targets[1])) {
              start = targets[0];
              end = targets[1];
            } else {
              start = targets[1];
              end = targets[0];
            }
            if (this.isGreater(date, start) && this.isLess(date, end)) {
              return true;
            }
            if (this.isEqual(date, start) || this.isEqual(date, end)) {
              return true;
            }
          }
        } else if (type === '!<>') {
          if (targets[0] && targets[1]) {
            let start, end;
            if (this.isLess(targets[0], targets[1])) {
              start = targets[0];
              end = targets[1];
            } else {
              start = targets[1];
              end = targets[0];
            }
            if (!this.isGreater(date, start) || !this.isLess(date, end)) {
              return true;
            }
          }
        } else if (type === '!<=>') {
          if (targets[0] && targets[1]) {
            let start, end;
            if (this.isLess(targets[0], targets[1])) {
              start = targets[0];
              end = targets[1];
            } else {
              start = targets[1];
              end = targets[0];
            }
            if (!this.isEqual(date, start) && !this.isEqual(date, end) && (this.isLess(date, start) || this.isGreater(date, end))) {
              return true;
            }
          }
        } else if (type === 'w') {
          let w = this.getWeekDay(date).index;
          for (let i = 0; i < targets.length; i++) {
            if (w === +targets[i]) {
              return true;
            }
          }
        } else if (type === '!w') {
          let w = this.getWeekDay(date).index;
          for (let i = 0; i < targets.length; i++) {
            if (w !== +targets[i]) {
              return true;
            }
          }
        }
      }
      return false;
    };
    this.convertToArray = (date, jalali) => {
      if (!date) {
        return [];
      }
      let list;
      if (Array.isArray(date)) {
        list = [...date];
      } else if (typeof date === 'string') {
        if (date.indexOf("T") !== -1) {
          //"2015-03-25T12:00:00Z"
          let [d1, t1] = date.split("T");
          let t2 = t1.split(".")[0];
          let t3 = t2.split(':');
          let d2 = d1.split('-');
          list = [...d2.map(o => +o), ...t3.map(o => +o), 0];
        } else {
          list = date.split(this.getSplitter(date)).map(o => +o);
        }
      } else if (typeof date === 'number') {
        let d = new Date(date);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let second = d.getSeconds();
        let miliseconds = d.getMilliseconds();
        let tenthsecond = Math.round(miliseconds / 100);
        list = [year, month, day, hour, minute, second, tenthsecond];
      } else if (typeof date === 'object') {
        if (typeof date.year === 'number') {
          let dateObject = date;
          return [dateObject.year, dateObject.month, dateObject.day, dateObject.hour];
        } else {
          let dateObject = date;
          let year = dateObject.getFullYear();
          let month = dateObject.getMonth() + 1;
          let day = dateObject.getDate();
          let hour = dateObject.getHours();
          let minute = dateObject.getMinutes();
          let second = dateObject.getSeconds();
          let miliseconds = dateObject.getMilliseconds();
          let tenthsecond = Math.round(miliseconds / 100);
          list = [year, month, day, hour, minute, second, tenthsecond];
        }
      } else {
        return false;
      }
      if (jalali) {
        let [year, month, day] = this.toJalali([list[0], list[1], list[2]]);
        list[0] = year;
        list[1] = month;
        list[2] = day;
      }
      return list;
    };
    this.isAny = (o1, o2, key) => {
      if (!o1 || !o2) {
        return false;
      }
      o1 = this.convertToArray(o1);
      o2 = this.convertToArray(o2);
      let compaireKey = 'equal';
      for (let i = 0; i < o1.length; i++) {
        if (isNaN(o2[i])) {
          o2[i] = o1[i];
        }
        let a = o1[i];
        let b = o2[i] || 0;
        if (a < b) {
          compaireKey = 'less';
        }
        if (a > b) {
          compaireKey = 'greater';
        }
      }
      return compaireKey === key;
    };
    this.isLess = (o1, o2) => this.isAny(o1, o2, 'less');
    this.isEqual = (o1, o2) => this.isAny(o1, o2, 'equal');
    this.isGreater = (o1, o2) => this.isAny(o1, o2, 'greater');
    this.isBetween = (o1, [o2, o3]) => this.isAny(o1, o2, 'greater') && this.isAny(o1, o3, 'less');
    this.getWeekDay = date => {
      let dateArray = this.convertToArray(date);
      let jalali = this.isJalali(dateArray);
      dateArray = this.toGregorian(date);
      let index = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).getDay();
      if (jalali) {
        index += 1;
        index = index % 7;
      }
      return {
        weekDay: this.getWeekDays(jalali)[index],
        index
      };
    };
    this.isJalali = date => {
      return this.convertToArray(date)[0] < 1700 ? true : false;
    };
    this.getWeekDays = jalali => {
      return [['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'], ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']][jalali ? 0 : 1];
    };
    this.toGregorian = date => {
      if (!date) {
        return [];
      }
      let arr = this.convertToArray(date);
      let jalali = this.isJalali(arr);
      if (!jalali) {
        return arr;
      }
      let [jy, jm, jd] = arr;
      var sal_a, gy, gm, gd, days;
      jy += 1595;
      days = -355668 + 365 * jy + ~~(jy / 33) * 8 + ~~((jy % 33 + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
      gy = 400 * ~~(days / 146097);
      days %= 146097;
      if (days > 36524) {
        gy += 100 * ~~(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
      }
      gy += 4 * ~~(days / 1461);
      days %= 1461;
      if (days > 365) {
        gy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
      }
      gd = days + 1;
      sal_a = [0, 31, gy % 4 === 0 && gy % 100 !== 0 || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
      arr[0] = gy;
      arr[1] = gm;
      arr[2] = gd;
      return arr;
    };
    this.pattern = (date, pattern, jalali = this.isJalali(date)) => {
      date = this.convertToArray(date, jalali);
      let [year, month, day, hour, minute, second, tenthsecond] = date;
      pattern = pattern.replace('{year}', year.toString());
      if (typeof month === 'number') {
        pattern = pattern.replace('{month}', this.get2Digit(month));
      }
      if (typeof day === 'number') {
        pattern = pattern.replace('{day}', this.get2Digit(day));
      }
      if (typeof hour === 'number') {
        pattern = pattern.replace('{hour}', this.get2Digit(hour));
      }
      if (typeof minute === 'number') {
        pattern = pattern.replace('{minute}', this.get2Digit(minute));
      }
      if (typeof second === 'number') {
        pattern = pattern.replace('{second}', this.get2Digit(second));
      }
      if (typeof tenthsecond === 'number') {
        pattern = pattern.replace('{tenthsecond}', this.get2Digit(tenthsecond));
      }
      if (pattern.indexOf('{monthString}') !== -1) {
        pattern = pattern.replace('{monthString}', this.getMonths(jalali)[month - 1]);
      }
      if (pattern.indexOf('{weekDay}') !== -1) {
        let weekDays = this.getWeekDays(jalali);
        let {
          index
        } = this.getWeekDay(date);
        pattern = pattern.replace('{weekDay}', weekDays[index]);
      }
      return pattern;
    };
    this.get2Digit = n => {
      let ns;
      try {
        ns = n.toString();
      } catch {
        return n;
      }
      if (ns.length === 1) {
        ns = '0' + n;
      }
      return ns;
    };
    this.getMonths = jalali => {
      return [['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'], ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']][jalali ? 0 : 1];
    };
    this.toJalali = date => {
      let arr = this.convertToArray(date);
      let jalali = this.isJalali(arr);
      if (jalali) {
        return arr;
      }
      let [gy, gm, gd] = arr;
      var g_d_m, jy, jm, jd, gy2, days;
      g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      gy2 = gm > 2 ? gy + 1 : gy;
      days = 355666 + 365 * gy + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
      jy = -1595 + 33 * ~~(days / 12053);
      days %= 12053;
      jy += 4 * ~~(days / 1461);
      days %= 1461;
      if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
      }
      if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + days % 31;
      } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + (days - 186) % 30;
      }
      arr[0] = jy;
      arr[1] = jm;
      arr[2] = jd;
      return arr;
    };
    this.getSplitter = value => {
      let splitter = '/';
      for (let i = 0; i < value.length; i++) {
        if (isNaN(parseInt(value[i]))) {
          return value[i];
        }
      }
      return splitter;
    };
    this.getTime = (date, jalali = this.isJalali(date)) => {
      if (!date) {
        return;
      }
      if (typeof date === 'number') {
        return date;
      }
      date = this.convertToArray(date);
      let [year, month = 1, day = 1, hour = 0, minute = 0, second = 0, tenthsecond = 0] = date;
      if (jalali) {
        date = this.toGregorian([year, month, day, hour, minute, second, tenthsecond]);
      }
      let time = new Date(date[0], date[1] - 1, date[2]).getTime();
      time += hour * 60 * 60 * 1000;
      time += minute * 60 * 1000;
      time += second * 1000;
      time += tenthsecond * 100;
      return time;
    };
    this.getNextTime = (date, offset, jalali = this.isJalali(date)) => {
      if (!offset) {
        return this.convertToArray(date);
      }
      let time = this.getTime(date, jalali);
      time += offset;
      let dateArray = this.convertToArray(time);
      if (jalali) {
        let [jy, jm, jd] = this.toJalali(dateArray);
        dateArray[0] = jy;
        dateArray[1] = jm;
        dateArray[2] = jd;
      }
      return dateArray;
    };
    this.getMonthDaysLength = date => {
      if (!date) {
        return 0;
      }
      let [year, month] = this.convertToArray(date);
      let jalali = this.isJalali([year, month]);
      if (jalali) {
        return [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, [1, 5, 9, 13, 17, 22, 26, 30].indexOf(year % 33) === -1 ? 29 : 30][month - 1];
      } else {
        return new Date(year, month - 1, 0).getDate();
      }
    };
    this.getYearDaysLength = date => {
      if (!date) {
        return 0;
      }
      let [year] = this.convertToArray(date);
      let res = 0;
      for (let i = 1; i <= 12; i++) {
        res += this.getMonthDaysLength([year, i]);
      }
      return res;
    };
    this.getDaysOfWeek = (date, pattern) => {
      if (!date) {
        return [];
      }
      let dateArray = this.convertToArray(date);
      let {
        index
      } = this.getWeekDay(dateArray);
      let startDate = this.getNextTime([dateArray[0], dateArray[1], dateArray[2]], -(index + 1) * 24 * 60 * 60 * 1000);
      let endDate = this.getNextTime([dateArray[0], dateArray[1], dateArray[2]], (7 - index) * 24 * 60 * 60 * 1000);
      return this.getDatesBetween(startDate, endDate, 24 * 60 * 60 * 1000);
    };
    this.getDatesBetween = (date, otherDate, step = 24 * 60 * 60 * 1000) => {
      if (!date || !otherDate) {
        return [];
      }
      date = this.convertToArray(date);
      otherDate = this.convertToArray(otherDate);
      if (!this.isGreater(otherDate, date)) {
        return [];
      }
      let delta = this.getDelta(date, otherDate);
      let length = delta.miliseconds / step;
      if (isNaN(length) || length > 1000) {
        console.error('AIODate().getDatesBetween() => too many dates');
        return;
      }
      let nextDate = this.getNextTime(date, step);
      let res = [];
      while (this.isLess(nextDate, otherDate)) {
        res.push(nextDate);
        nextDate = this.getNextTime(nextDate, step);
      }
      return res;
    };
    this.getDelta = (date, otherDate, unit) => {
      let dif = this.getTime(date) - this.getTime(otherDate);
      return this.convertMiliseconds(-dif, unit);
    };
    this.convertMiliseconds = (miliseconds = 0, unit = 'day') => {
      let type;
      if (miliseconds < 0) {
        type = 'passed';
        miliseconds = -miliseconds;
      } else if (miliseconds > 0) {
        type = 'remaining';
      } else {
        type = 'now';
      }
      let index = ['day', 'hour', 'minute', 'second', 'tenthsecond', 'milisecond'].indexOf(unit);
      let day = 0,
        hour = 0,
        minute = 0,
        second = 0,
        tenthsecond = 0;
      let dif = miliseconds;
      if (index <= 0) {
        day = Math.floor(dif / (24 * 60 * 60 * 1000));
        dif -= day * (24 * 60 * 60 * 1000);
      }
      if (index <= 1) {
        hour = Math.floor(dif / (60 * 60 * 1000));
        dif -= hour * (60 * 60 * 1000);
      }
      if (index <= 2) {
        minute = Math.floor(dif / (60 * 1000));
        dif -= minute * (60 * 1000);
      }
      if (index <= 3) {
        second = Math.floor(dif / 1000);
        dif -= second * 1000;
      }
      if (index <= 4) {
        tenthsecond = Math.floor(dif / 100);
      }
      return {
        day,
        hour,
        minute,
        second,
        tenthsecond,
        miliseconds,
        type
      };
    };
    this.getDaysOfMonth = (date, pattern) => {
      let dateArray = this.convertToArray(date);
      let firstDay = [dateArray[0], dateArray[1], 1];
      let lastDay = this.getLastDayOfMonth(dateArray);
      let betweenDayes = this.getDatesBetween(firstDay, lastDay, 24 * 60 * 60 * 1000);
      let result = [firstDay];
      result = result.concat(betweenDayes);
      result.push(lastDay);
      if (pattern) {
        return result.map(o => this.getDateByPattern(o, pattern));
      }
      return result;
    };
    this.getLastDayOfMonth = date => {
      let dateArray = this.convertToArray(date);
      let length = this.getMonthDaysLength(dateArray);
      let lastDay = [date[0], date[1], length];
      return lastDay;
    };
    this.getDateByPattern = (date, pattern) => this.pattern(date, pattern);
    this.getToday = jalali => {
      let date = new Date();
      let dateArray = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), Math.round(date.getMilliseconds() / 100)];
      if (jalali) {
        dateArray = this.toJalali(dateArray);
      }
      return dateArray;
    };
    this.getDayIndex = (date, unit) => {
      date = this.convertToArray(date);
      if (unit === 'week') {
        let days = this.getDaysOfWeek(date);
        for (let i = 0; i < days.length; i++) {
          let [year, month, day] = days[i];
          if (year !== date[0]) {
            continue;
          }
          if (month !== date[1]) {
            continue;
          }
          if (day !== date[2]) {
            continue;
          }
          return i;
        }
      }
      if (unit === 'month') {
        return date[2] - 1;
      }
      if (unit === 'year') {
        let res = 0;
        for (let i = 0; i < date[1] - 1; i++) {
          res += this.getMonthDaysLength(date);
        }
        res += date[1];
        return res - 1;
      }
    };
  }
}
export class Geo {
  constructor() {
    _defineProperty(this, "getAngle", void 0);
    _defineProperty(this, "getDipAngle", void 0);
    _defineProperty(this, "getLength", void 0);
    _defineProperty(this, "getPrepDip", void 0);
    _defineProperty(this, "getDip", void 0);
    _defineProperty(this, "getPrepFromLine", void 0);
    _defineProperty(this, "getLineBySLA", void 0);
    _defineProperty(this, "getArcByPoints", void 0);
    _defineProperty(this, "getAvg", void 0);
    _defineProperty(this, "getArcBy3Points", void 0);
    _defineProperty(this, "getYOnLineByX", void 0);
    _defineProperty(this, "getXOnLineByY", void 0);
    _defineProperty(this, "getMeet", void 0);
    _defineProperty(this, "getInnerMeet", void 0);
    _defineProperty(this, "getDLineByLine", void 0);
    _defineProperty(this, "getPointsByNGon", void 0);
    _defineProperty(this, "getLineByDLine", void 0);
    _defineProperty(this, "tri", void 0);
    _defineProperty(this, "getPrepToLine", void 0);
    _defineProperty(this, "getLineType", void 0);
    _defineProperty(this, "getLine", void 0);
    _defineProperty(this, "getDLine", void 0);
    _defineProperty(this, "setLineByLength", void 0);
    _defineProperty(this, "getParallelLine", void 0);
    _defineProperty(this, "getPointsByDivide", void 0);
    _defineProperty(this, "fix", void 0);
    _defineProperty(this, "setLineByAngle", void 0);
    _defineProperty(this, "getNumberByStep", void 0);
    _defineProperty(this, "setLineByOrtho", void 0);
    _defineProperty(this, "rotateSpline", void 0);
    _defineProperty(this, "isPointInPath", void 0);
    _defineProperty(this, "getDXF", void 0);
    this.getAngle = l => {
      let line = this.getLineType(l) === 'DLine' ? this.getLineByDLine(l) : l;
      let [p1, p2] = line;
      let deltaX = p2[0] - p1[0];
      let deltaY = p2[1] - p1[1];
      let length = this.getLength([[0, 0], [deltaX, deltaY]]);
      let angle = Math.acos(deltaX / length) / Math.PI * 180;
      angle = Math.sign(deltaY) < 0 ? 360 - angle : angle;
      return parseFloat(angle.toFixed(4));
    };
    this.getLineType = line => Array.isArray(line[0]) ? 'Line' : 'DLine';
    this.getLine = l => this.getLineType(l) === 'Line' ? l : this.getLineByDLine(l);
    this.getDLine = l => this.getLineType(l) === 'DLine' ? l : this.getDLineByLine(l);
    this.getDipAngle = dip => this.getAngle([0, 0, dip]);
    this.getLength = line => Math.sqrt(Math.pow(line[0][0] - line[1][0], 2) + Math.pow(line[0][1] - line[1][1], 2));
    this.getPrepDip = dip => -1 / dip;
    this.getDip = l => {
      let line = this.getLine(l);
      return line[0][1] - line[1][1] / line[0][0] - line[1][0];
    };
    this.getLineByDLine = dline => {
      let [x, y] = dline;
      let X = this.getXOnLineByY(dline, y + 10);
      let Y = this.getYOnLineByX(dline, X);
      return [[x, y], [X, Y]];
    };
    this.getPrepFromLine = (l, point, offset) => {
      if (!offset) {
        return point;
      }
      let dline = this.getDLine(l);
      let angle = this.getAngle(dline);
      return this.getLineBySLA(point, offset, angle - 90)[1];
    };
    this.getPrepToLine = (l, point) => {
      let dline = this.getDLine(l);
      let prepLine = [point[0], point[1], this.getPrepDip(dline[2])];
      return this.getMeet(dline, prepLine);
    };
    this.getLineBySLA = (p1, length, angle) => {
      if (!length) {
        return [p1, p1];
      }
      return [p1, [p1[0] + this.tri('cos', angle) * length, p1[1] + this.tri('sin', angle) * length]];
    };
    this.getArcByPoints = (arcPoints, height) => {
      var points = [];
      var stringPoints = [];
      for (var i = 0; i < arcPoints.length; i++) {
        if (i === 3) {
          break;
        }
        var point = arcPoints[i];
        var stringPoint = point.toString();
        if (stringPoints.indexOf(stringPoint) !== -1) {
          continue;
        }
        stringPoints.push(stringPoint);
        points.push(point);
      }
      var p1 = points[0],
        p2 = points[1],
        p3 = points[2];
      var changeObject = {
        x: 0,
        y: 0,
        r: 0
      };
      if (points.length === 1) {
        changeObject = {
          r: 0,
          x: p1[0],
          y: p1[1]
        };
      } else if (points.length === 2) {
        let avg = this.getAvg([p1, p2]);
        let dline = this.getDLineByLine([p1, p2]);
        let pm = this.getPrepFromLine(dline, avg, height);
        if (height) {
          changeObject = this.getArcBy3Points(p1, pm, p2);
        } else {
          changeObject = {
            r: this.getLength([p1, p2]) / 2,
            x: avg[0],
            y: avg[1]
          };
        }
      } else {
        changeObject = this.getArcBy3Points(p1, p2, p3);
      }
      return changeObject;
    };
    this.getAvg = arr => {
      var x = 0,
        y = 0,
        length = arr.length;
      for (var i = 0; i < length; i++) {
        x += arr[i][0];
        y += arr[i][1];
      }
      return [x / length, y / length];
    };
    this.getArcBy3Points = (p1, p2, p3) => {
      let dip1 = this.getPrepDip(this.getDip([p1, p2]));
      let dip2 = this.getPrepDip(this.getDip([p2, p3]));
      let point1 = this.getAvg([p1, p2]);
      let point2 = this.getAvg([p2, p3]);
      let dline1 = [point1[0], point1[1], dip1];
      let dline2 = [point2[0], point2[1], dip2];
      let meet = this.getMeet(dline1, dline2);
      if (!meet) {
        return {
          x: 0,
          y: 0,
          r: 0
        };
      }
      let x = meet[0],
        y = meet[1];
      let a1 = this.getAngle([meet, p1]),
        a2 = this.getAngle([meet, p2]),
        a3 = this.getAngle([meet, p3]);
      let slice;
      if (a1 < a2 && a2 < a3) {
        slice = [a1, a3];
      } else if (a2 < a3 && a3 < a1) {
        slice = [a1, a3];
      } else if (a3 < a1 && a1 < a2) {
        slice = [a1, a3];
      } else if (a3 < a2 && a2 < a1) {
        slice = [a3, a1];
      } else if (a1 < a3 && a3 < a2) {
        slice = [a3, a1];
      } else if (a2 < a1 && a1 < a3) {
        slice = [a3, a1];
      } else {
        slice = [0, 0];
      }
      let arc = {
        x,
        y,
        r: this.getLength([p1, [x, y]]),
        slice
      };
      return arc;
    };
    this.getDLineByLine = line => {
      let [p1] = line;
      return [p1[0], p1[1], this.getDip(line)];
    };
    this.getMeet = (l1, l2) => {
      //get {line1,line2} or {point1,point2,dip1,dip2}
      let dline1 = this.getDLine(l1);
      let dline2 = this.getDLine(l2);
      let [p1x, p1y, dip1] = dline1;
      let [p2x, p2y, dip2] = dline2;
      if (dip1 === dip2) {
        return false;
      }
      if (Math.abs(dip1) === Infinity) {
        return [p1x, this.getYOnLineByX(dline2, p1x)];
      }
      if (Math.abs(dip2) === Infinity) {
        return [p2x, this.getYOnLineByX(dline1, p2x)];
      }
      var x = (dip1 * p1x - dip2 * p2x + p2y - p1y) / (dip1 - dip2);
      var y = dip1 * (x - p1x) + p1y;
      return [x, y];
    };
    this.getInnerMeet = (line1, line2) => {
      let meet = this.getMeet(line1, line2);
      if (meet === false) {
        return false;
      }
      if (line2[0][0] < line2[1][0]) {
        if (meet[0] < line2[0][0] || meet[0] > line2[1][0]) {
          return false;
        }
      } else {
        if (meet[0] < line2[1][0] || meet[0] > line2[0][0]) {
          return false;
        }
      }
      if (line2[0][1] < line2[1][1]) {
        if (meet[1] < line2[0][1] || meet[1] > line2[1][1]) {
          return false;
        }
      } else {
        if (meet[1] < line2[1][1] || meet[1] > line2[0][1]) {
          return false;
        }
      }
      if (line1[0][0] < line1[1][0]) {
        if (meet[0] < line1[0][0] || meet[0] > line1[1][0]) {
          return false;
        }
      } else {
        if (meet[0] < line1[1][0] || meet[0] > line1[0][0]) {
          return false;
        }
      }
      if (line1[0][1] < line1[1][1]) {
        if (meet[1] < line1[0][1] || meet[1] > line1[1][1]) {
          return false;
        }
      } else {
        if (meet[1] < line1[1][1] || meet[1] > line1[0][1]) {
          return false;
        }
      }
      return meet;
    };
    this.getYOnLineByX = (l, X) => {
      // get {x,line} or {x,point,dip}
      let [x, y, dip] = this.getDLine(l);
      if (dip === Infinity) {
        return 0;
      }
      return dip * (X - x) + y;
    };
    this.getXOnLineByY = (l, Y) => {
      // get {y,line} or {y,point,dip}
      let [x, y, dip] = this.getDLine(l);
      if (dip === 0) {
        return 0;
      }
      if (dip === Infinity) {
        return x;
      }
      return (Y - y) / dip + x;
    };
    this.tri = (type, a) => Math[type](a * Math.PI / 180);
    this.getPointsByNGon = (radius, count, corner) => {
      let ang = 180 - 360 / count;
      let w = +(this.tri('cos', ang / 2) * radius).toFixed(6) * 2;
      let h = +(this.tri('sin', ang / 2) * radius).toFixed(6);
      let p1 = [0, -h, corner];
      let p2 = [0 + w / 2, -h, corner];
      let points = [p1, p2];
      let a = 360 / count;
      for (let i = 0; i < count - 1; i++) {
        let p = [points[i + 1][0] + this.tri('cos', a) * w, points[i + 1][1] + this.tri('sin', a) * w, corner];
        a += 360 / count;
        points.push(p);
      }
      points.push(p1);
      return points;
    };
    this.setLineByLength = (line, length, side = 'end') => {
      let p1,
        p2,
        angle = this.getAngle(line);
      if (side === 'center') {
        let center = this.getAvg(line);
        let line1 = this.getLineBySLA(center, length / 2, angle + 180);
        let line2 = this.getLineBySLA(center, length / 2, angle);
        p1 = line1[1];
        p2 = line2[1];
      } else if (side === 'end') {
        p1 = line[0];
        let newLine = this.getLineBySLA(p1, length, angle);
        p2 = newLine[1];
      } else if (side === 'start') {
        p2 = line[1];
        let newLine = this.getLineBySLA(p2, length, angle + 180);
        p1 = newLine[1];
      }
      return [p1, p2];
    };
    this.getParallelLine = (points, offset) => {
      let lines = [];
      let length = points.length;
      if (length === 2) {
        let p1 = this.getPrepFromLine([points[0], points[1]], points[0], offset);
        let p2 = this.getPrepFromLine([points[0], points[1]], points[1], offset);
        return [p1, p2];
      }
      for (var i = 1; i <= length; i++) {
        var point = points[i];
        if (i === length) {
          break;
        }
        var beforePoint = points[i - 1];
        var p1 = this.getPrepFromLine([beforePoint, point], beforePoint, offset);
        var p2 = this.getPrepFromLine([beforePoint, point], point, offset);
        lines.push([p1, p2]);
      }
      let res = [];
      length = lines.length;
      for (let i = 0; i < length; i++) {
        let line = lines[i];
        let beforeLine = lines[i - 1];
        if (i === 0) {
          points.push([line[0][0], line[0][1]]);
          continue;
        }
        let meet = this.getMeet(beforeLine, line);
        if (meet) {
          res.push(meet);
        }
        if (i === length - 1) {
          points.push([line[1][0], line[1][1]]);
        }
      }
      return res;
    };
    this.getPointsByDivide = (line, divide) => {
      let [p1, p2] = line;
      let deltaX = this.fix(p2[0] - p1[0]),
        deltaY = this.fix(p2[1] - p1[1]);
      let uX = deltaX / divide,
        uY = deltaY / divide;
      let points = [];
      for (let i = 1; i < divide; i++) {
        points.push([p1[0] + i * uX, p1[1] + i * uY]);
      }
      return points;
    };
    this.fix = value => {
      return parseFloat(value.toFixed(6));
    };
    this.setLineByAngle = (line, angle) => {
      let length = this.getLength(line);
      if (!length) {
        return line;
      }
      angle = angle % 360;
      return this.getLineBySLA([line[0][0], line[0][1]], length, angle);
    };
    this.getNumberByStep = (number, step) => Math.round(number / step) * step;
    this.setLineByOrtho = (line, ortho) => this.setLineByAngle(line, this.getNumberByStep(this.getAngle(line), ortho));
    this.rotateSpline = (points, angle, center) => {
      let Points = JSON.parse(JSON.stringify(points));
      for (var i = 0; i < Points.length; i++) {
        let p = Points[i];
        let line = [[...center], [p[0], p[1]]];
        let lineAngle = this.getAngle(line);
        line = this.setLineByAngle(line, angle + lineAngle);
        p[0] = line[1][0];
        p[1] = line[1][1];
      }
      return Points;
    };
    this.isPointInPath = (points, point) => {
      let meets = 0;
      for (let i = 0; i < points.length; i++) {
        let curentPoint = points[i],
          nextPoint;
        if (i === points.length - 1) {
          nextPoint = points[0];
        } else {
          nextPoint = points[i + 1];
        }
        let meet = this.getInnerMeet([[point[0], point[1]], [9999999999, point[1]]], [[curentPoint[0], curentPoint[1]], [nextPoint[0], nextPoint[1]]]);
        if (meet !== false) {
          meets++;
        }
      }
      return meets % 2 !== 0;
    };
    this.getDXF = (list = []) => {
      var get = {
        line: function (line) {
          let [p1, p2] = line;
          let res = '';
          res += "LINE" + "\r\n" + "8" + "\r\n" + "1" + "\r\n" + "62" + "\r\n" + "0" + "\r\n" + "10" + "\r\n" + p1[0] + "\r\n" + "20" + "\r\n" + p1[1] * -1 + "\r\n" + "30" + "\r\n" + "0.0" + "\r\n" + "11" + "\r\n" + p2[0] + "\r\n" + "21" + "\r\n" + p2[1] * -1 + "\r\n" + "31" + "\r\n" + "0.0" + "\r\n" + "0" + "\r\n";
          return res;
        },
        rect: function (rect) {
          let [p1, p2] = rect;
          var rectangle = '';
          rectangle += this.line([[p1[0], p1[1]], [p2[0], p2[1]]]);
          rectangle += this.line([[p2[0], p1[1]], [p2[0], p2[1]]]);
          rectangle += this.line([[p2[0], p2[1]], [p1[0], p2[1]]]);
          rectangle += this.line([[p1[0], p2[1]], [p1[0], p1[1]]]);
          return rectangle;
        },
        arc: function (arc) {
          let {
            x,
            y,
            r,
            slice = [0, 360]
          } = arc;
          let res = '';
          res += "ARC" + "\r\n" + "8" + "\r\n" + "1" + "\r\n" + "62" + "\r\n" + "0" + "\r\n" + "10" + "\r\n" + x + "\r\n" + "20" + "\r\n" + y * -1 + "\r\n" + "30" + "\r\n" + "0.0" + "\r\n" + "40" + "\r\n" + r + "\r\n" + "50" + "\r\n" + slice[0] + "\r\n" + "51" + "\r\n" + slice[1] + "\r\n" + "0" + "\r\n";
          return arc;
        }
      };
      let entities = '';
      for (let i = 0; i < list.length; i++) {
        var {
          type,
          obj
        } = list[i];
        entities += get[type](obj);
      }
      var dxfText = "0" + "\r\n" + "SECTION" + "\r\n" + "2" + "\r\n" + "ENTITIES" + "\r\n" + "0" + "\r\n";
      dxfText += entities;
      dxfText += "ENDSEC" + "\r\n" + "0" + "\r\n" + "EOF";
      return dxfText;
    };
  }
}
function svgArcRange(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
export function svgArc(x, y, radius, startAngle, endAngle) {
  if (startAngle === endAngle || endAngle - startAngle === 360) {
    startAngle = 0;
    endAngle = 360;
  }
  if (startAngle === 360) {
    startAngle = 359.99;
  }
  if (endAngle === 360) {
    endAngle = 359.99;
  }
  let start = svgArcRange(x, y, radius, endAngle);
  let end = svgArcRange(x, y, radius, startAngle);
  let largeArcFlag;
  if (endAngle - startAngle < -180) {
    console.log(0);
    largeArcFlag = '0';
  } else if (endAngle - startAngle < 0) {
    //console.log(1)
    largeArcFlag = '1';
  } else if (endAngle - startAngle <= 180) {
    //console.log(2)
    largeArcFlag = '0';
  } else if (endAngle - startAngle <= 360) {
    //console.log(3)
    largeArcFlag = '1';
  } else {
    //console.log(4)
    largeArcFlag = '0';
  }
  let d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
  return d;
}
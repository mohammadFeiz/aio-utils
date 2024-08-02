import { ReactNode } from 'react';
type I_dateObject = {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
};
export type I_Date = string | number | Date | I_dateObject | number[];
export type I_point = number[];
export type I_line = [I_point, I_point];
export type I_dline = [number, number, number];
export type I_dip = number;
export type I_arc = {
    x: number;
    y: number;
    r: number;
    slice?: number[];
};
export type I_rect = [I_point, I_point];
export declare function HasClass(target: any, className: string): any;
export declare function DownloadFile(file: any): Promise<void>;
export declare function GetFileUrl(file: any): string;
export declare function Stall(stallTime?: number): Promise<void>;
export declare function FileToBase64(file: any, callback: (result: any) => void): void;
export declare function GetPrecisionCount(number: number): number;
export declare function HandleBackButton(callback?: () => void): void;
export declare function ParseString(str: string): any;
export declare function ReOrder(data: any[], fromIndex: number, toIndex: number): any[];
export declare class DragClass {
    over: (e: any) => void;
    dragData: any;
    getDragAttrs: (dragData: any) => any;
    getDropAttrs: (dropData: any) => any;
    reOrder: (data: any[], fromIndex: number, toIndex: number) => any[];
    constructor(p: {
        callback: (dragData: any, dropData: any) => void;
    });
}
export declare function GetClient(e: any): {
    x: number;
    y: number;
};
export declare function ExportToExcel(rows: any[], config?: any): void;
export declare function SplitNumber(price: number, count?: number, splitter?: string): string;
export declare function EventHandler(selector: string, event: 'mousedown' | 'mousemove' | 'mouseup' | 'click', action: any, type?: 'bind' | 'unbind'): void;
export declare function getValueByStep(p: {
    value: number;
    start: number;
    step: number;
    end: number;
}): number;
export declare function URLToJSON(url: string): {
    [key: string]: any;
};
export declare function FileSize(number: number): string;
export declare function FilePreview(file: any, attrs?: any): React.ReactNode;
export declare function JSXToHTML(jsx: any): string;
export declare function Copy(text: any): Promise<void>;
export declare function IsTouch(): boolean;
export declare function Paste(): Promise<ClipboardItems>;
export declare function Search(items: any[], searchValue: string, getValue?: (item: any, index: number) => any): any[];
export declare function GenerateComponsition(p: {
    level?: number;
    length?: number;
    childsField?: string;
    fields: any;
}): any[];
export declare function CalculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
export declare function getEventAttrs(eventType: 'onMouseDown' | 'onMouseMove' | 'onMouseUp', callback: (e: any) => void): {
    [x: string]: (e: any) => void;
};
export declare function AddToAttrs(attrs: any, p: any): any;
export type I_Swip_mousePosition = {
    x: number;
    y: number;
    xp: number;
    yp: number;
    clientX: number;
    clientY: number;
    centerAngle: number;
};
export type I_Swip_change = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    dist: number;
    angle: number;
    deltaCenterAngle: number;
};
export type I_Swip_parameter = {
    change: I_Swip_change;
    mousePosition: I_Swip_mousePosition;
    domLimit: I_Swip_domLimit;
    parentLimit: I_Swip_domLimit;
    event: any;
    selectRect?: I_Swip_selectRect;
    isInSelectRect?: I_Swip_isInSelectRect;
};
type I_Swip_selectRect_config = {
    color?: string;
    enable: () => boolean;
};
export type I_Swip = {
    dom: () => any;
    parent?: () => any;
    onClick?: (p: I_Swip_parameter) => void;
    page?: () => any;
    start?: (p: I_Swip_parameter) => number[];
    move?: (p: I_Swip_parameter) => void;
    end?: (p: I_Swip_parameter) => void;
    selectRect?: I_Swip_selectRect_config;
    speedX?: number;
    speedY?: number;
    stepX?: number | boolean;
    stepY?: number | boolean;
    reverseY?: boolean;
    reverseX?: boolean;
    minY?: number;
    maxY?: number;
    minX?: number;
    maxX?: number;
    insideX?: boolean;
    insideY?: boolean;
};
export type I_Swip_domLimit = {
    width: number;
    height: number;
    left: number;
    top: number;
    centerX: number;
    centerY: number;
    right: number;
    bottom: number;
};
type I_Swip_isInSelectRect = (x: number, y: number) => boolean;
type I_Swip_getIsInSelectrect = (selectRect: I_Swip_selectRect) => I_Swip_isInSelectRect;
export type I_Swip_selectRect = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export type I_Swip_tempSelectRect = {
    left: number;
    top: number;
};
export declare class Swip {
    p: I_Swip;
    geo: Geo;
    timeout: any;
    count: number;
    domLimit: I_Swip_domLimit;
    parentLimit: I_Swip_domLimit;
    getDom: () => any;
    getParent: () => any;
    init: () => void;
    dx: number;
    dy: number;
    cx: number;
    cy: number;
    dist: number;
    so: {
        client?: {
            x: number;
            y: number;
        };
        x?: number;
        y?: number;
        sr?: I_Swip_selectRect;
        tsr?: I_Swip_tempSelectRect;
    };
    getPercentByValue: (value: number, start: number, end: number) => number;
    getMousePosition: (e: any) => I_Swip_mousePosition;
    click: (e: any) => void;
    mouseDown: (e: any) => void;
    mouseMove: (e: any) => void;
    mouseUp: (e: any) => void;
    getDOMLimit: (type: 'dom' | 'parent') => I_Swip_domLimit;
    change: I_Swip_change;
    getPage: () => any;
    isMoving: boolean;
    centerAngle: number;
    defaultLimit: I_Swip_domLimit;
    addSelectRect: (x: number, y: number) => void;
    setSelectRect: (width: number, height: number) => void;
    removeSelectRect: () => void;
    selectRect?: I_Swip_selectRect_config;
    getIsInSelectRect: I_Swip_getIsInSelectrect;
    defaultChange: I_Swip_change;
    constructor(p: I_Swip);
}
export declare class AIODate {
    isMatch: (date: I_Date, matchers: string[]) => boolean;
    convertToArray: (date: I_Date, jalali?: boolean) => number[];
    isLess: (date1: I_Date, date2: I_Date) => boolean;
    isGreater: (date1: I_Date, date2: I_Date) => boolean;
    isEqual: (date1: I_Date, date2: I_Date) => boolean;
    isBetween: (date1: I_Date, dates: [I_Date, I_Date]) => boolean;
    compaire: (date1: I_Date, date2: I_Date) => 'less' | 'greater' | 'equal';
    getWeekDay: (date: I_Date) => {
        weekDay: string;
        index: number;
    };
    isToday: (date: I_Date) => boolean;
    isJalali: (date: I_Date) => boolean;
    getWeekDays: (jalali?: boolean) => string[];
    toGregorian: (date: I_Date) => number[];
    toJalali: (date: I_Date) => number[];
    pattern: (date: I_Date, pattern: string, jalali?: boolean) => string;
    get2Digit: (n: number) => string;
    getMonths: (jalali?: boolean) => string[];
    getSplitter: (value: string) => string;
    getTime: (date: I_Date, jalali?: boolean) => number;
    getNextTime: (date: I_Date, offset: number, jalali?: boolean) => number[];
    getMonthDaysLength: (date: I_Date) => number;
    getYearDaysLength: (date: I_Date) => number;
    getDaysOfWeek: (date: I_Date, pattern?: string) => any[];
    getDatesBetween: (date: I_Date, otherDate: any, step?: number) => any[];
    getDelta: (date: I_Date, otherDate?: I_Date, unit?: 'day' | 'hour' | 'minute' | 'second' | 'tenthsecond' | 'milisecond') => {
        day: number;
        hour: number;
        minute: number;
        second: number;
        tenthsecond: number;
        miliseconds: number;
        type: 'remaining' | 'passed' | 'now';
    };
    convertMiliseconds: (miliseconds: number, unit?: 'day' | 'hour' | 'minute' | 'second' | 'tenthsecond' | 'milisecond') => {
        day: number;
        hour: number;
        minute: number;
        second: number;
        tenthsecond: number;
        miliseconds: number;
        type: 'remaining' | 'passed' | 'now';
    };
    getDaysOfMonth: (date: I_Date, pattern?: string) => any[];
    getLastDayOfMonth: (date: I_Date) => any[];
    getDateByPattern: (date: I_Date, pattern: string) => string;
    getToday: (jalali?: boolean) => number[];
    getDayIndex: (date: I_Date, unit: 'week' | 'year' | 'month') => number;
    getYesterday: (date: I_Date) => I_Date;
    getTomarrow: (date: I_Date) => I_Date;
    toMiliseconds: (p: {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
    }) => number;
    getDateByDeltaMiliseconds: (date: I_Date, miliseconds: number) => number[];
    constructor();
}
export declare class Geo {
    getAngle: (l: I_line | I_dline) => number;
    getDipAngle: (dip: I_dip) => number;
    getLength: (p: I_line) => number;
    getPrepDip: (dip: I_dip) => number;
    getDip: (l: I_line | I_dline) => I_dip;
    getPrepFromLine: (l: I_dline | I_line, point: I_point, offset: number) => I_point;
    getLineBySLA: (p1: I_point, length: number, angle: number) => I_line;
    getArcByPoints: (arcPoints: I_point[], height?: number) => any;
    getAvg: (list: I_point[]) => I_point;
    getArcBy3Points: (p1: I_point, p2: I_point, p3: I_point) => I_arc;
    getYOnLineByX: (l: I_dline | I_line, X: number) => number;
    getXOnLineByY: (l: I_dline | I_line, Y: number) => number;
    getMeet: (l1: I_dline | I_line, l2: I_dline | I_line) => I_point | false;
    getInnerMeet: (line1: I_line, line2: I_line) => false | I_point;
    getDLineByLine: (line: I_line) => I_dline;
    getPointsByNGon: (r: number, count: number, corner: number) => I_point[];
    getLineByDLine: (dline: I_dline) => I_line;
    tri: (type: 'sin' | 'cos', teta: number) => number;
    getPrepToLine: (l: I_dline | I_line, p: I_point) => I_point | false;
    getLineType: (line: I_dline | I_line) => 'DLine' | 'Line';
    getLine: (l: I_dline | I_line) => I_line;
    getDLine: (l: I_dline | I_line) => I_dline;
    setLineByLength: (line: I_line, length: number, from?: 'center' | 'start' | 'end') => I_line;
    getParallelLine: (points: I_point[], offset: number) => I_point[];
    getPointsByDivide: (points: I_point[], divide: number) => I_point[];
    fix: (value: number) => number;
    setLineByAngle: (line: I_line, angle: number) => I_line;
    getNumberByStep: (number: number, step: number) => number;
    setLineByOrtho: (line: I_line, ortho: number) => I_line;
    rotateSpline: (points: I_point[], angle: number, center: I_point) => I_point[];
    isPointInPath: (points: I_point[], point: I_point) => boolean;
    getDXF: (p: {
        type: 'line' | 'rect' | 'arc';
        obj: any;
    }[]) => string;
    constructor();
}
export declare function GetCities(): {
    "\u0622\u0630\u0631\u0628\u0627\u06CC\u062C\u0627\u0646 \u0634\u0631\u0642\u06CC": string[];
    "\u0622\u0630\u0631\u0628\u0627\u06CC\u062C\u0627\u0646 \u063A\u0631\u0628\u06CC": string[];
    اردبیل: string[];
    اصفهان: string[];
    البرز: string[];
    ایلام: string[];
    بوشهر: string[];
    تهران: string[];
    "\u0686\u0647\u0627\u0631\u0645\u062D\u0627\u0644 \u0648 \u0628\u062E\u062A\u06CC\u0627\u0631\u06CC": string[];
    "\u062E\u0631\u0627\u0633\u0627\u0646 \u062C\u0646\u0648\u0628\u06CC": string[];
    "\u062E\u0631\u0627\u0633\u0627\u0646 \u0631\u0636\u0648\u06CC": string[];
    "\u062E\u0631\u0627\u0633\u0627\u0646 \u0634\u0645\u0627\u0644\u06CC": string[];
    خوزستان: string[];
    زنجان: string[];
    سمنان: string[];
    "\u0633\u06CC\u0633\u062A\u0627\u0646 \u0648 \u0628\u0644\u0648\u0686\u0633\u062A\u0627\u0646": string[];
    فارس: string[];
    قزوین: string[];
    قم: string[];
    کردستان: string[];
    کرمان: string[];
    کرمانشاه: string[];
    "\u06A9\u0647\u06AF\u06CC\u0644\u0648\u06CC\u0647 \u0648 \u0628\u0648\u06CC\u0631\u0627\u062D\u0645\u062F": string[];
    گلستان: string[];
    لرستان: string[];
    گیلان: string[];
    مازندران: string[];
    مرکزی: string[];
    هرمزگان: string[];
    همدان: string[];
    یزد: string[];
};
export declare function Get2Digit(n: number): string;
export declare function svgArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string;
export declare function getValueByField(data: any, field: string, def?: any): any;
export declare function setValueByField(data: any, field: string, value: any): any;
export declare function GetArray(count: number, fn?: (index: number) => any): any[];
export declare function GetRandomNumber(from: number, to: number): number;
type I_storage_model = {
    [key: string]: any;
};
type I_storage_time = {
    [key: string]: number;
};
export declare class Storage {
    model: I_storage_model;
    time: I_storage_time;
    init: () => void;
    saveStorage: (model: I_storage_model, time: I_storage_time) => void;
    getParent: (field: string) => I_storage_model | undefined;
    removeValueByField: (field: string) => I_storage_model;
    setValueByField: (field: string, value: any) => I_storage_model;
    getValueByField: (field: string) => any;
    save: (field: string, value: any) => I_storage_model;
    remove: (field: string, callback?: () => void) => I_storage_model;
    load: (field: string, def?: any, time?: number) => any;
    clear: () => void;
    download: (file: any, name: string) => void;
    export: () => void;
    read: (file: any, callback: (model: any) => void) => void;
    import: (file: any, callback: () => void) => void;
    getModel: () => I_storage_model;
    constructor(id: string);
}
type I_dd_dateArray = number[];
export type I_dd_data = {
    [year: string]: I_dd_year;
};
type I_dd_year = {
    [month: string]: I_dd_month;
};
type I_dd_month = {
    [day: string]: I_dd_day;
};
type I_dd_day = any;
type I_list_item = {
    date: I_dd_dateArray;
    value: any;
};
export default class DateData {
    data: I_dd_data;
    getToday: () => number[];
    setDayValue: (dateArray: I_dd_dateArray, data: {
        [key: string]: any;
    }) => void;
    getYearDic: (dateArray: I_dd_dateArray) => I_dd_year;
    getMonthDic: (dateArray: I_dd_dateArray) => I_dd_month;
    getDayDic: (dateArray: I_dd_dateArray) => I_dd_day;
    getDayValue: (dateArray: I_dd_dateArray, field?: string, def?: any) => any;
    getMonthList: (dateArray: I_dd_dateArray, field: string, def?: any) => I_list_item[];
    getYearList: (dateArray: I_dd_dateArray, field: string, def?: any) => I_list_item[];
    getWeekList: (dateArray: I_dd_dateArray, field: string, def?: any) => I_list_item[];
    getData: () => I_dd_data;
    d: AIODate;
    constructor(data: I_dd_data);
}
export declare function DisabledContextMenu(): void;
export type AV_operator = 'contain' | 'required' | '=' | '>' | '>=' | '<' | '<=' | 'startBy' | '<>' | '<=>';
export type AV_props = {
    lang?: 'fa' | 'en';
    title?: string;
    value: any;
    validations: AV_item[];
};
type AV_item_object = {
    target: any;
    title?: string;
    message?: string;
    value: any;
    operator: AV_operator;
    not: boolean;
    equal: boolean;
    fn: any;
};
export type AV_item = string | Omit<AV_item_object, 'value' | 'equal' | 'fn'>;
type AV_fn = 'less' | 'greater' | 'equal' | 'contain' | 'startBy' | 'required' | 'between';
export declare class Validation {
    contain: (target: any, value: any) => {
        result: boolean;
        unit: any;
    };
    startBy: (target: any, value: any) => {
        result: boolean;
        unit: any;
    };
    equal: (target: any, value: any, equal?: boolean) => {
        result: boolean;
        unit: any;
    };
    less: (target: any, value: any, equal?: boolean) => {
        result: boolean;
        unit: any;
    };
    greater: (target: any, value: any, equal?: boolean) => {
        result: boolean;
        unit: any;
    };
    between: (targets: any[], value: any, equal?: boolean) => {
        result: boolean;
        unit: any;
    };
    getMessage: (p: {
        translate: string;
        target: string;
        message?: string;
        title?: string;
        unit: string;
    }) => string;
    translate: (operator: AV_operator, not: boolean) => string;
    getResult: (p: AV_item_object) => string | boolean;
    getValidation: () => string | boolean;
    validate: () => string | boolean;
    boolKey: (key: 'more' | 'less') => string;
    boolDic: any;
    getUnit: (value: any) => string;
    constructor(props: AV_props);
}
export declare function ValidationTextToObject(vtext: string, Title?: string): {
    title: string;
    target: any;
    not: boolean;
    equal: boolean;
    fn: AV_fn;
    operator: AV_operator;
    message: string;
};
type PS_validation = {
    targets: any[];
    not: boolean;
    operator: AV_operator;
    bool?: PS_bool;
};
type PS_filter = {
    field: string;
    validation: PS_validation | string;
};
export declare function ConvertTextToFilters(sentence: string, columns: any[]): (PS_filter | string)[];
type PS_bool = 'و' | 'یا';
export declare function FilterRows(rows: any[], filters: PS_filter[][]): any[];
type I_color = any;
type I_color_type = 'rgb' | 'hex' | 'array';
export declare class AIOColors {
    number_to_hex: (number: number) => string;
    getType: (c: I_color) => I_color_type;
    to_array: (c: I_color) => number[];
    between: (c1: I_color, c2: I_color, count: number) => string[];
    getBetween: (v: (string | number)[]) => I_color[];
    to_dark: (c: I_color, percent: number) => I_color;
    to_light: (c: I_color, percent: number) => I_color;
    brightness: (c: I_color, percent: number) => I_color;
    to_hex: (c: I_color) => string;
    to_rgb: (c: I_color) => string;
    log: (c: I_color[]) => void;
    getRandomRGB: (c1?: I_color, c2?: I_color) => string;
    reverse: (c: I_color) => I_color;
    constructor();
}
declare class GetSvg {
    getStyle: (color?: string) => {
        fill: string;
    };
    getSvgStyle: (size?: number) => {
        width: string;
        height: string;
    };
    fixSvgContent: (content: ReactNode, size?: number, p?: {
        spin?: number;
        color?: string;
    }) => JSX.Element;
    getIcon: (path: string, size?: number, p?: {
        spin?: number;
        color?: string;
    }) => JSX.Element;
    mdiChevronDown: (color?: string) => JSX.Element;
    mdiClose: (color?: string) => JSX.Element;
    mdiLoading: (color?: string) => JSX.Element;
    mdiAttachment: (color?: string) => JSX.Element;
    mdiCircleMedium: (color?: string) => JSX.Element;
    mdiMagnify: (color?: string) => JSX.Element;
    mdiPlusThick: (color?: string) => JSX.Element;
    mdiImage: (color?: string) => JSX.Element;
    mdiEye: (color?: string) => JSX.Element;
    mdiEyeOff: (color?: string) => JSX.Element;
    mdiDotsHorizontal: (color?: string) => JSX.Element;
    mdiChevronRight: (color?: string) => JSX.Element;
    mdiChevronLeft: (color?: string) => JSX.Element;
    mdiArrowDown: (color?: string) => JSX.Element;
    mdiArrowUp: (color?: string) => JSX.Element;
    mdiFileExcel: (color?: string) => JSX.Element;
    mdiSort: (color?: string) => JSX.Element;
    mdiDelete: (color?: string) => JSX.Element;
    mdiCircleSmall: (color?: string) => JSX.Element;
}
export { GetSvg };

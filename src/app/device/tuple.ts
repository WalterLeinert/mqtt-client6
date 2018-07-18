export class Tuple<T1, T2> {
    constructor(private _v1: T1, private _v2: T2) {
    }

    public get v1(): T1 {
        return this._v1;
    }

    public get v2(): T2 {
        return this._v2;
    }
}

export class Tuple3<T1, T2, T3> extends Tuple<T1, T2> {
    constructor(v1: T1, v2: T2, private _v3: T3) {
        super(v1, v2);
    }

    public get v3(): T3 {
        return this._v3;
    }
}

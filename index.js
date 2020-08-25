const defaultCtx = {
    name: "",
    mods: {}
}

function isString(v){
    return typeof v == "string";
}

function isMod(v){
    return typeof v == "object" && v !== null;
}

function debug(){
    return {
        name: this.name,
        mods: {...this.mods}
    }
}

function mergeCtx(a, b){
    return {
        name: `${a.name}__${b.name}`,
        mods: {
            ...a.mods, 
            ...b.mods
        }
    }
}

// function mergeCtx(ctx){
//     ctx.name = `${this.name ? `${this.name}__` : this.name}${ctx.name}`;
//     ctx.mods = {
//         ...this.mods,
//         ...ctx.mods
//     }
//     return ctx;
// }

function toString(ctx){
    const names = [ctx.name];
    Object.entries(ctx.mods)
        .filter(([, value]) => !!value)
        .forEach(([mod]) => {
            names.push(`${ctx.name}--${mod}`)
        })
    
    return names.join(" ");
}
// function toString(){
//     const names = [this.name];
//     Object.entries(this.mods)
//         .filter(([, value]) => !!value)
//         .forEach(([mod]) => {
//             names.push(`${this.name}--${mod}`)
//         })
    
//     return names.join(" ");
// }

function createCtx(...params){
    let ctx = {...defaultCtx};
    ctx.name = params
        .filter(isString)
        .reduce((acc, curr) => `${acc ? `${acc}-` : acc}${curr.trim()}`, "");

    ctx.mods = params
        .filter(isMod)
        .reduce((acc, curr) => ({...acc, ...curr}), {});

    ctx.mergeCtx = mergeCtx.bind(ctx);
    ctx.toString = toString.bind(ctx);
    return ctx;

}

function bem(ctx, ...params){
    if (params.length == 0){
        return toString(ctx)
    }

    const newCtx = mergeCtx(ctx, createCtx(...params))
    newCtx.toString = toString.bind(null, newCtx);
    return newCtx;

}

// function bem(...params){
//     if (params.length == 0){
//         return this.toString()
//     }

//     const ctx = this.mergeCtx(createCtx(...params))
//     // newCtx.toString = toString.bind(newCtx);
//     // return newCtx;
//     const _bem = bem.bind(ctx);
//     _bem.toString = toString.bind(ctx);
//     _bem.debug = debug.bind(ctx);
//     return _bem;

// }

function factory(name){
    const ctx = createCtx(name.trim());
    const _bem = bem.bind(null, ctx);
    _bem.toString = toString.bind(null, ctx);
    return _bem;
}
// function factory(name){
//     // const ctx = createCtx(name.trim());
//     const _default = createCtx("", {});
//     return bem.call(_default, name.trim())
    
//     // const _bem = bem.bind(ctx);
//     // _bem.toString = toString.bind(ctx);
//     // return _bem;
// }

const block = factory;

const b = block("list");

console.log(b.toString(), b(), `${b}`)

console.log(b("item", {error: true, severe: "10", success: ""}).toString())

console.log("" + b("title", "header", {error: true, severe: "10", success: ""}))


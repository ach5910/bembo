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

function mergeCtx(ctx){
    ctx.name = `${this.name ? `${this.name}__` : this.name}${ctx.name}`;
    ctx.mods = {
        ...this.mods,
        ...ctx.mods
    }
    return ctx;
}

function toString(){
    const names = [this.name];
    Object.entries(this.mods)
        .filter(([, value]) => !!value)
        .forEach(([mod]) => {
            names.push(`${this.name}--${mod}`)
        })
    
    return names.join(" ");
}

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

function createBem(ctx){
    const _bem = bem.bind(ctx);
    _bem.toString = toString.bind(ctx);
    _bem.debug = debug.bind(ctx);
    return _bem;
}


function bem(...params){
    if (params.length == 0){
        return this.toString()
    }

    const ctx = this.mergeCtx(createCtx(...params))
    return createBem(ctx);

}
function factory(name){
    const _default = createCtx();
    return bem.call(_default, name.trim())
}

const block = factory;

const b = block("list");

console.log(b.toString(), b(), `${b}`)

console.log(b("item", {error: true, severe: "10", success: ""}).toString())

console.log(`${b("item", {error: true, severe: "10", success: ""})("title", "header", {success: "true"})}`)

console.log(`${b("item", {error: true, severe: "10", success: ""})("title", "header", {error: false, severe: false,success: "true"})}`)

console.log("" + b("title", "header", {error: true, severe: "10", success: ""}), b("title", "header", {error: true, severe: "10", success: ""}).debug())


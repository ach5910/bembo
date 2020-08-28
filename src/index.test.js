import bem from '.';

it('coerces a block to a string', () => {
    const list = bem("list");
    expect(`${list}`).toEqual("list");
    expect("" + list).toEqual("list");
})

it('accepts block and el string initial call', () => {
    const list = bem("list list__item");
    expect(`${list}`).toEqual("list list__item");
    expect("" + list).toEqual("list list__item");
})

it('accepts block and mod obj on initial call', () => {
    const list = bem("list",  {error: true, severe: "10", success: ""});
    expect(`${list}`).toEqual("list list--error list--severe");
    expect("" + list).toEqual("list list--error list--severe");
})
it('creates a element', () => {
    const list = bem("list");
    expect(`${list.el("item")}`).toEqual("list__item");
})

it('creates a element calling .e', () => {
    const list = bem("list");
    expect(`${list.e("item")}`).toEqual("list__item");
})

it('creates a modifier calling mod with obj', () => {
    const list = bem("list");
    expect(`${list.mod({error: true, severe: "10", success: ""}, {error: false, severe: "10", success: 1})}`).toEqual("list list--severe list--success");
})

it('creates a modifier calling .m with obj', () => {
    const list = bem("list");
    expect(`${list.m({error: true, severe: "10", success: ""}, {error: false, severe: "10", success: 1})}`).toEqual("list list--severe list--success");
})

it('creates a modifier chaining mod calls with objs', () => {
    const list = bem("list");
    expect(`${list.mod({error: true, severe: "10", success: ""}).mod({error: false, severe: "10", success: 1})}`).toEqual("list list--severe list--success");
})

it('creates a modifier chaining .m calls with objs', () => {
    const list = bem("list");
    expect(`${list.m({error: true, severe: "10", success: ""}).m({error: false, severe: "10", success: 1})}`).toEqual("list list--severe list--success");
})

it('creates correct modifier calling mod with different typed truthy values', () => {
    const list = bem("list");
    expect(`${list.mod({selected: true})}`).toEqual("list list--selected");
    expect(`${list.mod({selected: "selected"})}`).toEqual("list list--selected");
    expect(`${list.mod({selected: 1})}`).toEqual("list list--selected");

})

it('creates correct modifier calling .m with different typed truthy values', () => {
    const list = bem("list");
    expect(`${list.m({selected: true})}`).toEqual("list list--selected");
    expect(`${list.m({selected: "selected"})}`).toEqual("list list--selected");
    expect(`${list.m({selected: 1})}`).toEqual("list list--selected");

})

it('creates correct modifier calling mod with multiple objs as arguements', () => {
    const list = bem("list");
    expect(`${list.mod({selected: true}, {error: true, severe: "10", success: ""})}`).toEqual("list list--selected list--error list--severe");
    expect(`${list.mod({selected: "selected"})}`).toEqual("list list--selected");
    expect(`${list.mod({selected: 1})}`).toEqual("list list--selected");
})

it('creates correct modifier calling .m with multiple objs as arguements', () => {
    const list = bem("list");
    expect(`${list.m({selected: true}, {error: true, severe: "10", success: ""})}`).toEqual("list list--selected list--error list--severe");
    expect(`${list.m({selected: "selected"})}`).toEqual("list list--selected");
    expect(`${list.m({selected: 1})}`).toEqual("list list--selected");
})

it('create a modifier calling mod with string', () => {
    const list = bem("list");
    expect(`${list.mod("selected")}`).toEqual("list list--selected");
})

it('create a modifier calling .m with string', () => {
    const list = bem("list");
    expect(`${list.m("selected")}`).toEqual("list list--selected");
})

it('applies multiple modifies', () => {
    const list = bem("list");
    expect(`${list.mod({error: true, severe: "10", success: ""})}`).toEqual("list list--error list--severe");
})

it('applies modifiers to an element calling el', () => {
    const list = bem("list");
    expect(`${list.el("item", {error: true, severe: "10", success: ""})}`).toEqual("list__item list__item--error list__item--severe");

})
// console.log(b());
// console.log(b)
// console.log(b.toString())

// console.log(b.toString(), b(), `${b}`)

// console.log(b("item", {error: true, severe: "10", success: ""}).toString())

// console.log(`${b("item", {error: true, severe: "10", success: ""})("title", "header", {success: "true"})}`)

// console.log(`${b("item", {error: true, severe: "10", success: ""})("title", "header", {error: false, severe: false,success: "true"})}`)

// console.log("" + b("title", "header", {error: true, severe: "10", success: ""}), b("title", "header", {error: true, severe: "10", success: ""}).debug())

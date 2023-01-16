(()=>{var e={204:function(e,t,o){"use strict";var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(s,r){function i(e){try{d(n.next(e))}catch(e){r(e)}}function c(e){try{d(n.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,c)}d((n=n.apply(e,t||[])).next())}))};const s=o(25);e.exports={getAllProducts:function(e,t){return n(this,void 0,void 0,(function*(){const e=yield s.readAll();t.json(e),console.log(s)}))},addNewProduct:function(e,t){return n(this,void 0,void 0,(function*(){const{id:o,name:n,price:r}=e.body;if(!o||!n||!r)return void t.status(400).json({mensaje:"campos requeridos"});const i=yield s.save({id:o,name:n,price:r});t.json(i)}))},getProductById:function(e,t){return n(this,void 0,void 0,(function*(){const o=parseInt(e.params.id);if(!o)return void t.status(400).json({mensaje:"campo requerido"});const n=yield s.getById(o);n||t.status(404).json({mensaje:"producto no encontrado"}),t.json(n)}))},updateProductById:function(e,t){return n(this,void 0,void 0,(function*(){const o=parseInt(e.params.id),{name:n,price:r}=e.body;if(!o)return void t.status(400).json({mensaje:"campo requerido"});const i=yield s.updateById(o,{id:o,name:n,price:r});t.json(i)}))},deleteById:function(e,t){return n(this,void 0,void 0,(function*(){const o=parseInt(e.params.id);if(!o)return void t.status(400).json({mensaje:"campo requerido"});const n=yield s.deleteById(o);t.json(n)}))},showProdutoView:function(e,t){return n(this,void 0,void 0,(function*(){const e=yield s.readAll();t.render("productos",{productos:e})}))}}},580:(e,t,o)=>{"use strict";o.r(t),o.d(t,{MongoConnection:()=>s});const n=o(185);o(251),n.set("strictQuery",!0);class s{constructor(){}static connect(){return e=this,t=void 0,r=function*(){if(!s.connected)try{return yield n.connect("mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40ts?retryWrites=true&w=majority"),s.connected=!0,n.set("strictQuery",!0),console.log("coneccion exitosa a MongoDB"),!0}catch(e){return!1}return!1},new((o=void 0)||(o=Promise))((function(n,s){function i(e){try{d(r.next(e))}catch(e){s(e)}}function c(e){try{d(r.throw(e))}catch(e){s(e)}}function d(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,c)}d((r=r.apply(e,t||[])).next())}));var e,t,o,r}}s.connected=!1},853:(e,t,o)=>{"use strict";const{Schema:n,model:s}=o(185),r=new s("productos",new n({name:{type:String,require:!0},price:{type:Number,require:!0}},{timestamps:!0}));e.exports=r},34:(e,t,o)=>{"use strict";o.r(t)},296:(e,t,o)=>{"use strict";o.r(t),o.d(t,{ProductoFactory:()=>u});var n=o(251),s=o(185),r=function(e,t,o,n){return new(o||(o=Promise))((function(s,r){function i(e){try{d(n.next(e))}catch(e){r(e)}}function c(e){try{d(n.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,c)}d((n=n.apply(e,t||[])).next())}))};const i=o(580),c=o(853);class d{constructor(){i(),this.productoModel=c}getAll(){return r(this,void 0,void 0,(function*(){const e=yield this.productoModel.find({});console.log(e)}))}getById(e){return r(this,void 0,void 0,(function*(){const t=new s.Types.ObjectId(e);return yield this.productoModel.findOne({_id:t})}))}save(e){return r(this,void 0,void 0,(function*(){const t=new this.productoModel(e);return t.save(),t}))}update(e,t){return r(this,void 0,void 0,(function*(){const o=new s.Types.ObjectId(e);return yield this.productoModel.updateOne({_id:o},t),t}))}delete(e){return r(this,void 0,void 0,(function*(){const t=new s.Types.ObjectId(e);return yield this.productoModel.deleteOne({_id:t}),!0}))}}class u{getDAO(){return"mongo"===n.DATABASE_TYPE&&(this.productoDAO=new d),this.productoDAO}}},854:()=>{},25:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>c});const n=o(296);o(34);class s{constructor(){const e=n();this.productoDao=e.getDAO()}getAll(){this.productoDao.getAll()}getById(e){this.productoDao.getById(e)}save(e){this.productoDao.save(e)}update(e,t){this.productoDao.update(e,t)}delete(e){this.productoDao.delete(e)}}var r=function(e,t,o,n){return new(o||(o=Promise))((function(s,r){function i(e){try{d(n.next(e))}catch(e){r(e)}}function c(e){try{d(n.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,c)}d((n=n.apply(e,t||[])).next())}))};new(o(371))("src/database/producto.json");class i{static initRepo(){i.repo=new s}static save(e){return r(this,void 0,void 0,(function*(){return i.initRepo(),i.repo.save(e)}))}static readAll(){return r(this,void 0,void 0,(function*(){return i.initRepo(),i.repo.getAll()}))}static getById(e){return r(this,void 0,void 0,(function*(){return i.initRepo(),i.repo.getById(e)}))}static updateById(e,t){return r(this,void 0,void 0,(function*(){return i.initRepo(),i.repo.update(e,t)}))}static deleteById(e){return r(this,void 0,void 0,(function*(){return i.initRepo(),i.repo.delete(e)}))}}const c=i},251:(e,t,o)=>{o(142).config(),MONGO_URI="mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40ts?retryWrites=true&w=majority",MONGO_URI2="mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40ts?retryWrites=true&w=majority",e.exports={PORT:"3000",JWT_KEY:"https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SARsBE5x_ua2ye823r2zKpQNaew3Daq8riKz5A4h3o4",MONGO_URI,MONGO_URI2,DATABASE_TYPE:"mongo"}},371:(e,t,o)=>{const n=o(147),s="utf-8";e.exports=class{constructor(e){this.filePath=e,this.createFileIfNoExist();const t=n.readFileSync(this.filePath,s);this.contenedor=JSON.parse(t)}createFileIfNoExist(){n.existsSync(this.filePath)||n.writeFileSync(this.filePath,"[]")}_saveAll(e){const t=JSON.stringify(e,null,2);n.writeFileSync(this.filePath,t,s)}save(e){if(!e.id){const t=this.contenedor.reduce(((e,t)=>t.id>e?t.id:e),0)+1;e.id=t}return this.contenedor.push(e),this._saveAll(this.contenedor),e}getById(e){return this.contenedor.filter((t=>t.id===e))}getAll(){return this.contenedor}deleteById(e){const t=this.contenedor.filter((t=>t.id!==e));this.contenedor=t,this._saveAll(this.contenedor)}deleteAll(){this.contenedor=[],this._saveAll(this.contenedor)}getRandom=async()=>this.contenedor.then((e=>e[Math.floor(Math.random()*e.length)]));updateById=async(e,t)=>{const o=await this.contenedor.findIndex((t=>t.id===e));return this.contenedor[o]=t,this._saveAll(this.contenedor),this.contenedor[o]}}},798:(e,t,o)=>{const n=o(854);e.exports={getAllMessages:function(e,t){const o=n.readAll();t.json(o)},addNewMessage:function(e,t){const{id:o,email:s,message:r}=e.body;if(!o||!s||!r)return void t.status(400).json({mensaje:"campos requeridos"});const i=n.save({id:o,email:s,message:r});t.json(i)},getMessageById:function(e,t){const o=parseInt(e.params.id);if(!o)return void t.status(400).json({mensaje:"campo requerido"});const s=n.getById(o);s||t.status(404).json({mensaje:"producto no encontrado"}),t.json(s)},updateMessageById:function(e,t){const o=parseInt(e.params.id),{email:s,message:r}=e.body;if(!o)return void t.status(400).json({mensaje:"campo requerido"});const i=n.updateById(o,{id:o,email:s,message:r});t.json(i)},deleteById:function(e,t){const o=parseInt(e.params.id);if(!o)return void t.status(400).json({mensaje:"campo requerido"});const s=n.deleteById(o);t.json(s)},showMensajeView:function(e,t){const o=n.readAll();t.render("mensajes",{mensajes:o})}}},187:(e,t,o)=>{const n=o(344),s=o(251);e.exports=function(e,t,o){const r=e.headers;if(!r.authorization)return void t.status(401).json({mensaje:"token requerido"});const i=r.authorization.split("token ")[1];try{n.verify(i,s)}catch(e){console.log(e)}o()}},838:(e,t,o)=>{const n=o(860).Router(),{getAllMessages:s,addNewMessage:r,getMessageById:i,updateMessageById:c,deleteById:d,showMensajeView:u}=o(798),a=o(187);n.get("/",s),n.post("/",a,r),n.get("/:id",i),n.put("/:id",a,c),n.delete("/:id",a,d),n.get("/view/mensajes",u),e.exports=n},404:(e,t,o)=>{const n=o(860).Router(),{getAllProducts:s,addNewProduct:r,getProductById:i,updateProductById:c,deleteById:d,showProdutoView:u}=o(204),a=o(187);n.get("/",s),n.post("/",r),n.get("/:id",i),n.put("/:id",a,c),n.delete("/:id",a,d),n.get("/view/productos",u),e.exports=n},336:(e,t,o)=>{const n=o(644).create({extname:".hbs",defaultLayout:"index.hbs",layoutsDir:__dirname+"/../",partialsDir:__dirname+"/../partials/"});e.exports=n},142:e=>{"use strict";e.exports=require("dotenv")},860:e=>{"use strict";e.exports=require("express")},644:e=>{"use strict";e.exports=require("express-handlebars")},344:e=>{"use strict";e.exports=require("jsonwebtoken")},185:e=>{"use strict";e.exports=require("mongoose")},147:e=>{"use strict";e.exports=require("fs")},685:e=>{"use strict";e.exports=require("http")}},t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";const e=o(185),t=o(860),{Server:n}=o(685),{urlencoded:s}=o(860),{PORT:r}=o(251),i=o(336),{MongoConnection:c}=o(580),d=t();c.connect(),function(){var t,o,n,s;t=this,o=void 0,s=function*(){yield e.connect("mongodb+srv://agussobrero:xpZFIMrxekWrDNMA@cluster0.7znzdl8.mongodb.net/clase40ts?retryWrites=true&w=majority"),console.log("conectado")},new((n=void 0)||(n=Promise))((function(e,r){function i(e){try{d(s.next(e))}catch(e){r(e)}}function c(e){try{d(s.throw(e))}catch(e){r(e)}}function d(t){var o;t.done?e(t.value):(o=t.value,o instanceof n?o:new n((function(e){e(o)}))).then(i,c)}d((s=s.apply(t,o||[])).next())}))}();const u=o(404),a=o(838);d.engine("hbs",i.engine),d.set("views","./src/views/"),d.set("view engine","hbs"),d.use(t.static("public")),d.use(t.json()),d.use(t.urlencoded({extended:!0})),d.use("/productos",u),d.use("/mensajes",a);const l=new n(d);d.get("/",((e,t)=>{t.sendFile(__dirname+"/public/index.html")})),l.listen(r,(()=>{console.log(`Conectado al puerto: ${r}`)}))})()})();
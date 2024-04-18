import { assert } from "chai";
import app from "../js/index.js";

const adatok = require("../js/adatok.json");

describe("Test", function(){
    describe("Ha nincs megadva semmi", function(){
        assert.equal(app.Search(["", "", "", "", "", "Zöld", ""]), adatok);
    })
})
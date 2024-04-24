import { assert } from "chai";
import app from "./index.js";
import adatok from './adatok.json' assert {type:'json'};

  describe('Test', function () {
    describe('Search', function () {
      it('Visszaadja az összes autót ha nem adsz meg semmit', function () {
        assert.equal(app.Search(["","","","","0",""]).length, adatok.length);
      });
      it('Fekete keresés', function () {
        assert.isTrue(app.Search(["","","","","fekete",""]).every(item => item.szin == "fekete"));
      });
      it("Árszűrés", function(){
        assert.isTrue(app.Search(["","","","","0",2000]).every(item => item.ar <= 2000));
      })
      it("Márka keresés", function(){
        assert.isTrue(app.Search(["","Honda","","","0",""]).every(item => item.marka == "Honda"));
      })
    });
  });
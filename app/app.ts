import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { Routes } from './routes';
import { Database } from './api/db';
import requestIp from 'request-ip';
import { Auth } from './api/auth';
import passport from 'passport';
import * as fs from 'fs';
import { PixiPolyfill, BBuilding, BuildableElement, OniItem, BuildMenuCategory, BuildMenuItem, BSpriteInfo, SpriteInfo, BSpriteModifier, SpriteModifier, ImageSource } from '../../blueprintnotincluded-lib/index'

import { BlueprintController } from './api/blueprint-controller';
import { PixiBackend } from './pixi-backend';

class App
{
  public db: Database;
  public app: express.Application;
  public auth: Auth;
  public routePrv: Routes = new Routes();

  

  constructor() {

    // Tests PIXI

    // This adds the singleton to the class static field
    let pixiBackend = new PixiBackend();
    let pixiPolyfill = new PixiPolyfill();

    // initialize configuration
    dotenv.config();
    console.log(process.env.ENV_NAME);

    // Read database
    let rawdata = fs.readFileSync('database.json').toString();
    let json = JSON.parse(rawdata);

    ImageSource.init();

    let elements: BuildableElement[] = json.elements;
    BuildableElement.init();
    BuildableElement.load(elements);

    let buildMenuCategories: BuildMenuCategory[] = json.buildMenuCategories;
    BuildMenuCategory.init();
    BuildMenuCategory.load(buildMenuCategories);

    let buildMenuItems: BuildMenuItem[] = json.buildMenuItems;
    BuildMenuItem.init();
    BuildMenuItem.load(buildMenuItems);

    let uiSprites: BSpriteInfo[] = json.uiSprites;
    SpriteInfo.init();
    SpriteInfo.load(uiSprites)

    let spriteModifiers: BSpriteModifier[] = json.spriteModifiers;
    SpriteModifier.init();
    SpriteModifier.load(spriteModifiers);
    
    let buildings: BBuilding[] = json.buildings;
    OniItem.init();
    OniItem.load(buildings);

    /*
    for (let k of ImageSource.keys) {
      let imageUrl = ImageSource.getUrl(k);
      //console.log(imageUrl)
      fs.readFile(imageUrl, 'binary', function(error, data) {
        var buf = new Buffer(data, 'binary');
        var datastring = buf.toString('base64');
        ImageSource.setUrl(k, "data:image/png;base64," +datastring);
        ImageSource.getBaseTexture(k);
        console.log(k)
        //console.log("data:image/png;base64," +datastring);
      });

    } //ImageSource.getBaseTexture(k);
*/
    // initialize database and authentification middleware
    this.db = new Database();
    this.auth = new Auth();

    // Create a new express application instance and add middleware
    this.app = express();
    this.app.use(requestIp.mw());
    this.app.use(express.json({limit:'1mb'}));
    this.app.use(passport.initialize());
    this.routePrv.routes(this.app);

  }
}

export default new App().app;

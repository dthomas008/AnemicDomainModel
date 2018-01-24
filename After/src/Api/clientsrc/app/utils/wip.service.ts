import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class WipService {  // inspired by John Papa https://github.com/johnpapa/angular.breeze.storagewip

  private wipKey = 'App.wipSummaryKey';
  private appErrorPrefix = '[ngzWip] ';
  private storeMeta = 'App.WIPV1';



  public StoreageEvents: Subject<any> = new Subject();

  constructor() { }




  private broadcast(messageName, activity, wip) {
    this.StoreageEvents.next({ messageName: { activity: activity, wip: wip || [] } });
  }

  clearAllWip() {
    const wip = this.getWipSummary();
    wip.forEach(function (item) {
      window.localStorage.removeItem(item.key);
    });
    this.broadcast(events.wipChanged, 'cleared all WIP', null);
    window.localStorage.removeItem(this.wipKey);
  }
  findWipKeyByEntityId(entityName, id) {
    const wip = this.getWipSummary();
    const wipItem = wip.filter(function (item) {
      return item.entityName.toLowerCase() === entityName.toLowerCase() && item.id === id;
    })[0];
    return wipItem ? wipItem.key : null;
  }

  getWipSummary() {
    let wip = [];
    const raw = window.localStorage.getItem(this.wipKey);
    if (raw) { wip = JSON.parse(raw); }
    return wip;
  }

  loadWipEntity(key): any {
    return this.importWipData(key);
  }
  removeWipEntity(key) {
    if (!key) { return; }

    window.localStorage.removeItem(key);
    // Remove the 1 wip header and create new array
    const wip = this.getWipSummary();
    const updatedWip = wip.filter(function (item) {
      return item.key !== key;
    });
    // re-save the wip summary and broadcast the changes
    window.localStorage.setItem(this.wipKey, JSON.stringify(updatedWip));
    this.broadcast(events.wipChanged, 'removed 1 entity', updatedWip);
  }
  storeWipEntity(entity, key, entityName, description, routeState) {
    // Entity is the entity to export.
    // key auto generated
    // an entity by itself away from the datacontext.
    // Data stashed here will not be imported into the
    // datacontext automatically.
    const prefix = this.appErrorPrefix;
    if (!entity) { throw new Error(prefix + 'Must pass entity to storeWipEntity'); }
    if (!entityName) { throw new Error(prefix + 'Must pass entityName to storeWipEntity'); }
    if (!description) { throw new Error(prefix + 'Must pass description to storeWipEntity'); }
    if (!routeState) { routeState = entityName.toLowerCase(); }

    // var entityState = entity.entityAspect.entityState; // no entity state here could use form states
    // var theseAreTheDroidsYoureLookingFor = entityState.isAdded() || entityState.isModified();
    // if (!theseAreTheDroidsYoureLookingFor) { return key; }
    
    if (!key) { key = this.uuidv4(); }
    // var exportData = manager.exportEntities([entity], false); // not using manager
    const exportData = JSON.stringify(entity);
    this.saveToLocalStorage(key, exportData);
    this.storeWipSummary(entity, key, entityName, description, routeState);
    return key;
  }
  // private saveToWipLocalStorage(key, data) {
  //   window.localStorage.setItem(key, this.formatStorageData(this.storeMeta, data));
  // }
  private importWipData(key) {
    const importedData = window.localStorage.getItem(key);
    // importedData = zStorageCore.checkStoreImportVersionAndParseData(importedData);
    const hasData = !!importedData;
    // if (hasData) {
    //     var importResults = manager.importEntities(importedData);
    // breeze manager not being used may need way to identify entities or forms
    //     var importedEntity = importResults.entities[0];
    //     return importedEntity;
    // }
    return JSON.parse(importedData);
  }
  private saveToLocalStorage(key, data) {
    // const stash = this.formatStorageData(this.storeMeta, data);
    window.localStorage.setItem(key, data);
  }

  private formatStorageData(meta, data) {
    return '[' + JSON.stringify(meta) + ',' + data + ']';
  }
  private storeWipSummary(entity, key, entityName, description, routeState) {
    const wipHeader = {
      // id: entity.id, // may need other id strategy
      date: new Date(),
      key: key,
      routeState: routeState,
      // state: entity.entityAspect.entityState.name,
      entityName: entityName,
      description: description
    };
    const wipSummary = this.getWipSummary();
    const exists = wipSummary.some(function (item) {
      return item.key === wipHeader.key;
    });
    if (!exists) {
      wipSummary.push(wipHeader);
      window.localStorage.setItem(this.wipKey, JSON.stringify(wipSummary));
    }
    this.broadcast(events.wipChanged, 'saved', wipSummary);
  }
  private uuidv4(): string {
    // tslint:disable-next-line:whitespace
    return (''+[1e7]+-1e3+-4e3+ -8e3 + -1e11).replace(/[018]/g, ch => {
        const c = Number(ch);
        // tslint:disable-next-line:no-bitwise
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
      }
    );
  }


}

enum events {
  error,
  storeChanged,
  wipChanged
}


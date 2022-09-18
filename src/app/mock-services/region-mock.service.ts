import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { RegionServiceInterface } from '../api-services/region.service';
import { SearchRequest } from '../common/app.model';
import { RegionSearchResponse, CreateRegionDto, UpdateRegionDto, RegionsItemDto, RegionsItemMinimalDto } from '../common/region.model';

@Injectable()
export class RegionMockService implements RegionServiceInterface {

  constructor() { }
  showMinimal(land_id: number): Observable<RegionsItemMinimalDto[]> {
    const d: RegionsItemMinimalDto[]=[
      {
        Id:1,
        LandId:2,
        Name:'regional',
        RegionDescription:'desc region'
      },
      {
        Id:2,
        LandId:2,
        Name:'regional 2',
        RegionDescription:'desc region 2'
      },
    ];
    return of(d);
  }
  search(data: SearchRequest): Observable<RegionSearchResponse> {
    const items:RegionsItemDto[]=[
      {
        CordinateRegion:JSON.stringify([{x:20,y:40},{x:50,y:90},{x:20,y:80}]),
        Id:1,
        Name:'Region 1',
        NMicrocontroller:4,
        RegionDescription:'region dari 1',
        LandId:4,
        LandName:'lahan pariwisata'
      },
      {
        CordinateRegion:JSON.stringify([{x:20,y:40},{x:50,y:90},{x:20,y:80}]),
        Id:3,
        Name:'Region 2',
        NMicrocontroller:4,
        RegionDescription:'region dari 1',
        LandId:4,
        LandName:'lahan tempe'
      },
      {
        CordinateRegion:JSON.stringify([{x:20,y:40},{x:50,y:90},{x:20,y:80}]),
        Id:7,
        Name:'Region 3',
        NMicrocontroller:4,
        RegionDescription:'region dari 1',
        LandId:4,
        LandName:'lahan tahu'
      }
    ];
    const res: RegionSearchResponse ={
      data:items,
      nTotal:items.length
    }
    return of(res).pipe(map(x=>{
      x.data = x.data.filter(y=>y.Name.includes(data.Search));
      x.nTotal = x.data.length;
      return x;
    }));
  }
  add(data: CreateRegionDto): Observable<number> {
    return of(3);
  }
  update(id: number, data: UpdateRegionDto): Observable<void> {
    return of(void 0);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
}
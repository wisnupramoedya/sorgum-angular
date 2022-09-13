import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router, RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import { ModalAddGreenhouseComponent } from '../../components/modal-add-greenhouse/modal-add-greenhouse.component';
import { LandItemDto } from 'src/app/common/land.model';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { LandService } from 'src/app/api-services/land.service';
import { CardNComponent } from 'src/app/components/card-n/card-n.component';
@Component({
  selector: 'app-land-list',
  standalone: true,
  templateUrl: './land-list.component.html',
  styleUrls: ['./land-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzListModule,
    NzGridModule,
    NzUploadModule,
    NzIconModule,
    NzModalModule,
    CardNComponent
  ],
})
export class LandListComponent implements OnInit {
  data: LandItemDto[] = [];

  form:FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });
  dataTotal = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private landService: LandService,
    private currentGreenHouse: CurrentGreenHouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.landService.search(x))
    ).subscribe(
      (res: any)=>{
        console.log(res);
        this.data = res.data;
        this.dataTotal=res.nTotal;
      }
    );
  }
  initForm():void{
    this.form = this.fb.nonNullable.group({
      Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
      N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
    });
  }
  changePageIndex(event:number):void{
    this.form.controls['Page'].setValue(event);
  }
  changePageSize(event:number):void{
    this.form.controls['N'].setValue(event);
  }
  submitFormSearch():void{

  }
  // gotoDashboard(id:number):void{
  //   this.currentGreenHouse.chosedGreenHouse.next(id);
  //   this.router.navigate(["dashboard",id]);
  // }
  showModalAddGreenHouse():void{
    this.modalService.create({
      nzContent:ModalAddGreenhouseComponent,
    }).afterClose.subscribe(id=>{
      console.log(id);
      if(!!id){
        // this.gotoDashboard(id);
      }
    })
  }
}

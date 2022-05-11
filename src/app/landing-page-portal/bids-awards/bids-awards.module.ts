import { SpinnerModule } from './../../spinner/spinner.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { ModalsModule } from 'src/app/shared/modals/modals.module';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidsAwardsRoutingModule } from './bids-awards-routing.module';
import { BidsAwardsComponent } from './bids-awards.component';

@NgModule({
  declarations: [BidsAwardsComponent],
  imports: [
    CommonModule,
    BidsAwardsRoutingModule,
    MaterialModule,
    ModalsModule,
    NoContentModule,
    SpinnerModule,
  ],
})
export class BidsAwardsModule {}

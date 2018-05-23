import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BranchDispatchers, DateDispatchers, BranchSelectors } from '../../../../store';
import { IBranch } from '../../../../models/IBranch';
import { BookingHelperService } from '../../../../services/util/bookingHelper.service';
import { IBookingInformation } from '../../../../models/IBookingInformation';

@Component({
  selector: 'qm-branch-booker',
  templateUrl: './qm-branch-booker.component.html',
  styleUrls: ['./qm-branch-booker.component.scss'],
})
export class QmBranchBookerComponent implements OnInit, OnDestroy {
  @Input()
  userDirection: string;

  private subscriptions: Subscription = new Subscription();
  public branches$: Observable<IBranch[]>;
  private selectedBranches$: Observable<IBranch[]>;
  private selectedBranches: IBranch[];


  constructor(
    private branchDispatchers: BranchDispatchers,
    private branchSelectors: BranchSelectors,
    private bookingHelperService: BookingHelperService,
    private dateDispatchers: DateDispatchers
  ) {
    this.branches$ = this.branchSelectors.visibleBranches$;
    this.selectedBranches$ = this.branchSelectors.selectedBranch$;
  }

  ngOnInit() {
    const selectedBranchSubscription = this.selectedBranches$.subscribe(
      (selectedBranches: IBranch[]) => {
        this.selectedBranches = selectedBranches;
      }
    );

    this.subscriptions.add(selectedBranchSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

   /***************/
  /*   BRANCHES  */
  /***************/

  /**
   * Filter branches
   * @param searchText - Search string
   */
  filterBranches(searchText: string) {
    this.branchDispatchers.filterBranches(searchText);
  }

  getBranchAddressText(branch: IBranch) {
    let completeAddress = '';
    if (branch) {
      const fieldsToLookFor = [
        'addressLine1',
        'addressLine2',
        'addressZip',
        'addressCity',
        'addressCountry'
      ];

      completeAddress = fieldsToLookFor.reduce((acc, curr) => {
        if (curr in branch) {
          const value = branch[curr];
          if (value !== null && value !== '') {
            if (acc === '') {
              return value;
            } else {
              return (acc += ', ' + value);
            }
          }
        }
        return acc;
      }, '');
    }

    return completeAddress;
  }

  /**
   * Click handler for branch selection
   * @param branch - Selected branch
   */
  handleBranchSelection(branch: IBranch) {
    const isSelected = this.isBranchSelected(branch);

    if (isSelected) {
      this.branchDispatchers.deselectBranch();
    } else {
      this.branchDispatchers.selectBranch(branch);
      this.getDates();
    }
  }

  /**
   * Getting the dates and populating the dates array
   * when a branch is selected
   */
  getDates() {
    const serviceQuery = this.bookingHelperService.getServicesQueryString();
    const branchPublicId = this.bookingHelperService.getSelectedBranches()[0].publicId;
    const numberOfCustomers = this.bookingHelperService.getSelectedNumberOfCustomers();

    const bookingInformation: IBookingInformation = {
      serviceQuery,
      branchPublicId,
      numberOfCustomers
    };

    this.dateDispatchers.getDates(bookingInformation);
  }

  /**
   * Checks if provided branch is in selected branches array
   * @param branch - Provided branch
   */
  isBranchSelected(branch: IBranch): boolean {
    return this.selectedBranches.reduce((acc: boolean, curr: IBranch) => {
      return !acc ? curr.publicId === branch.publicId : acc;
    }, false);
  }

}

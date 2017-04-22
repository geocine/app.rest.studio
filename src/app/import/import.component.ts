import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CloudFile, ConnectAccount } from '../@model/sync/connect-account';
import { BaseComponent } from '../@shared/components/base.component';
import { ConfigService } from '../@shared/config.service';
import { SyncService } from '../@shared/sync/sync.service';
import { State } from '../store/reducer';
import { getConnections } from '../store/selector';

@Component({
    selector: 'import',
    templateUrl: './import.component.html'
})
export class ImportComponent extends BaseComponent {
    public connections$: Observable<ConnectAccount[]>;

    constructor(public config: ConfigService,
                private syncService: SyncService,
                private store: Store<State>) {
        super();
        this.connections$ = store.select(getConnections);
    }

    public loadDropboxFiles(path: string, account: ConnectAccount) {
        let connectProvider = this.syncService.connectProvider(
            account.provider, account.accessToken);
        connectProvider.listFiles(path)
            .then((files: CloudFile[]) => {
                console.debug('path', path, 'files', files);
            });
    }
}
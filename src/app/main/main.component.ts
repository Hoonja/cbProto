import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [slideInDownAnimation]
})
export class MainComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('MainComponent.roomId', this.route.snapshot.params['roomId']);
    console.log('MainComponent.roomId.inParamMap', this.route.snapshot.paramMap.get('roomId'));
  }

  goHome() {
    this.router.navigate(['/home', { foo: 'foo', bar: 'bar' }]);
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-meaning',
  templateUrl: './logo-meaning.component.html',
  styleUrls: ['./logo-meaning.component.scss'],
})
export class LogoMeaningComponent implements OnInit {
  burgosLogo: string = '/assets/images/burgos-logo/burgos-logo.png';
  shield: string = '/assets/images/burgos-logo/shield-color.png';
  light: string = '/assets/images/burgos-logo/light.png';
  lightHouse: string = '/assets/images/burgos-logo/lighthouse.png';
  mountain: string = '/assets/images/burgos-logo/mountain.png';
  sea: string = '/assets/images/burgos-logo/sea.png';

  selectedCard: any;

  cardsSectionLeft: any = [
    {
      title: 'The Shield',
      body: `It emphasizes that Burgos is one of the municipalities of the province of Ilocos Norte and is under the guidance of the provincial government.`,
      parts: ['shield'],
      section: 'right',
    },
    {
      title: 'The Lighthouse',
      body: `It stands for the governing body and the different government
            agencies stationed within the locality which oversees how the
            municipality is managed.`,
      section: 'right',
      parts: ['light-house'],
    },
  ];

  cardsSectionRight: any = [
    {
      title: 'The Light',
      body: `It stands for the different services rendered or offered to the
            populace.`,
      section: 'left',
      parts: ['light'],
    },
    {
      title: 'The Mountain and Sea',
      body: `They symbolize the geographical location of the municipality for
            reason that Burgos is a coastal town and surrounded by verdant hills
            and mountains.`,
      section: 'left',
      parts: ['mountain', 'sea'],
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onPartSelect(card: any) {
    let offsetX = 0;

    let forwards: Keyframe[] | PropertyIndexedKeyframes = [
      {
        opacity: 0,
        scale: 1,
        transform: `translateY(0) translateX(${offsetX}px)`,
      },
      {
        opacity: 1,
        scale: 1.3,
        transform: `translateY(-25px) translateX(${offsetX}px)`,
        animationFillMode: 'forwards',
      },
    ];

    let backwards: Keyframe[] | PropertyIndexedKeyframes = [
      {
        opacity: 1,
        scale: 1.3,
        transform: `translateY(-25px) translateX(${offsetX}px)`,
        animationFillMode: 'forwards',
      },
      {
        opacity: 0,
        scale: 1,
        transform: `translateY(0) translateX(${offsetX}px)`,
      },
    ];

    if (this.selectedCard && this.selectedCard.title === card.title) {
      // console.log('same');

      for (const part of this.selectedCard.parts) {
        let keyframes = backwards;
        const elemPart = document.getElementsByClassName(part).item(0);

        this._animateDomElement(elemPart, keyframes);
        let bounding = elemPart?.clientWidth;
        offsetX += bounding || 0;
      }
      this.selectedCard = undefined;
      this.cdr.detectChanges();
      return;
    }

    if (this.selectedCard && this.selectedCard.title !== card.title) {
      // console.log('diff');
      for (const part of this.selectedCard.parts) {
        let keyframes = backwards;
        const elemPart = document.getElementsByClassName(part).item(0);

        this._animateDomElement(elemPart, keyframes);
        let bounding = elemPart?.clientWidth;
        offsetX += bounding || 0;
      }
      this.selectedCard = card;
      for (const part of card.parts) {
        let keyframes = forwards;

        const elemPart = document.getElementsByClassName(part).item(0);

        this._animateDomElement(elemPart, keyframes);
        let bounding = elemPart?.clientWidth;
        offsetX += bounding || 0;
      }
      this.cdr.detectChanges();
      return;
    } else {
      // console.log('new');
      this.selectedCard = card;
      this.cdr.detectChanges();
      for (const part of card.parts) {
        let keyframes = forwards;

        const elemPart = document.getElementsByClassName(part).item(0);

        this._animateDomElement(elemPart, keyframes);
        let bounding = elemPart?.clientWidth;
        offsetX += bounding || 0;
      }
    }
  }

  private _animateDomElement(
    element: any,
    keyframe: Keyframe[] | PropertyIndexedKeyframes
  ) {
    const ANIMATE_OPTS: KeyframeAnimationOptions = {
      duration: 500,
      fill: 'forwards',
    };

    element.animate(keyframe, ANIMATE_OPTS);
  }
}

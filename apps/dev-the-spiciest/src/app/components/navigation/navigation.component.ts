import { Component, ChangeDetectionStrategy } from '@angular/core';

interface NavigationMenuLink {
  href: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'dev-the-spiciest-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  links: NavigationMenuLink[] = [
    {
      href: 'https://dev.to/thespiciestdev',
      icon: 'fa-dev',
      name: 'DEV'
    },
    {
      href: 'https://github.com/METACEO',
      icon: 'fa-github',
      name: 'GitHub'
    },
    {
      href: 'https://www.linkedin.com/in/thespiciestdev/',
      icon: 'fa-linkedin',
      name: 'LinkedIn'
    },
    {
      href: 'https://www.reddit.com/user/TheSpiciestDev',
      icon: 'fa-reddit',
      name: 'Reddit'
    },
    {
      href: 'https://twitter.com/TheSpiciestDev',
      icon: 'fa-twitter',
      name: 'Twitter'
    },
    {
      href: 'https://news.ycombinator.com/user?id=TheSpiciestDev',
      icon: 'fa-y-combinator',
      name: 'YCombinator'
    },
    null,
    {
      href: 'https://discordapp.com/channels/@TheSpiciestDev',
      icon: 'fa-discord',
      name: 'Discord'
    }
  ];
  showMenu = false;

  public toggleShowMenu(): void {
    this.showMenu = !this.showMenu;
  }
}

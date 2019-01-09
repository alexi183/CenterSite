import { observable } from "mobx";

export class SelectHEaderStore {
  @observable newsRoute = '/news/page/1'
  @observable newsLink = '/news/'
  @observable newsTitle = 'Новости'

  @observable eventsRoute = '/events/page/1'
  @observable eventsLink = '/events/'
  @observable eventsTitle = 'События'

  @observable news_style = true
}

export default new SelectHEaderStore();

import { observable } from "mobx";
import axios from "axios";

export class partnersStore {
    @observable partnersList = null;
    @observable sliderImages = [];
    @observable preview = {};

    getPartners = () => {
        axios.get('/api/v1/partners/')
            .then(response =>
            {
                this.partnersList = response.data

                // let arr = this.partnersList.items.map((item) =>
                //     item.thumb_urls.previewPicture.original
                // )

                // this.sliderImages = arr;

            })
            .catch((error) => {
                console.log(error);
            })

    }
}

export default new partnersStore();

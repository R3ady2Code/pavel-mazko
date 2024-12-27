import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";

export class GalleryService {
    storage;

    constructor(storage) {
        this.storage = storage;
        this.ref = ref(storage, "gallery");
    }

    async all() {
        const result = await listAll(this.ref);

        const photoUrls = [];

        for (const item of result.items) {
            const photoUrl = await getDownloadURL(item);
            photoUrls.push(photoUrl);
        }

        return photoUrls;
    }

    async uploadImage(file) {
        const imageRef = ref(this.storage, `gallery/${Date.now()}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);

        return url;
    }

    async deleteImage(url) {
        const imageRef = ref(this.storage, url);

        await deleteObject(imageRef).catch((err) => console.log(err));
    }
}

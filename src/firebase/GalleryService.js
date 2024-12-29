import { ref, uploadBytes, getDownloadURL, deleteObject, listAll, getMetadata } from "firebase/storage";

export class GalleryService {
    storage;

    constructor(storage) {
        this.storage = storage;
        this.ref = ref(storage, "gallery");
    }

    async all() {
        const result = await listAll(this.ref);

        const photoData = await Promise.all(
            result.items.map(async (item) => {
                const metadata = await getMetadata(item);
                const photoUrl = await getDownloadURL(item);
                return {
                    url: photoUrl,
                    timeCreated: new Date(metadata.timeCreated)
                };
            })
        );

        const sortedPhotos = photoData.sort((a, b) => b.timeCreated - a.timeCreated);

        return sortedPhotos.map((photo) => photo.url);
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

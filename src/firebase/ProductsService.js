import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export class ProductService {
    db;
    collection;
    storage;

    constructor(db, storage) {
        this.db = db;
        this.collection = collection(db, "items");
        this.storage = storage;
    }

    doc(id) {
        return doc(this.db, "items", id);
    }

    async all() {
        const data = await getDocs(this.collection);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }

    async add(newItem) {
        const docRef = await addDoc(this.collection, newItem);
        return docRef;
    }

    async delete(id) {
        await deleteDoc(this.doc(id));
    }

    async update(id, updatedData) {
        await updateDoc(this.doc(id), updatedData);
    }

    async uploadImage(file, itemId, isCoverImg) {
        const imageRef = ref(this.storage, `items/${itemId}/${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);

        await updateDoc(this.doc(itemId), { imgSources: arrayUnion(url) });

        if (isCoverImg) await this.update(itemId, { coverImg: url });
    }

    async deleteImage(url, itemId) {
        const imageRef = ref(this.storage, url);
        await this.update(itemId, {
            imgSources: arrayRemove(url)
        });
        await deleteObject(imageRef).catch((err) => console.log(err));
    }
}

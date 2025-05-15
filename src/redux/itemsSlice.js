import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productModel, galleryModel } from "../firebase";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
    const data = await productModel.all();
    const secondSrc = (imgs, img) => imgs.filter((i) => i !== img);

    return data.map((item) =>
        item.coverImg
            ? { ...item, secondSrc: secondSrc(item.imgSources, item.coverImg) }
            : { ...item, coverImg: item.imgSources[0], secondSrc: secondSrc(item.imgSources, item.imgSources[0]) }
    );
});

export const fetchGallery = createAsyncThunk("gallery/fetchGallery", async () => {
    const data = await galleryModel.all();
    return data;
});

export const addItem = createAsyncThunk("items/addItem", async (newItem) => {
    const docRef = await productModel.add(newItem);
    return { ...newItem, id: docRef.id };
});

export const updateItem = createAsyncThunk("items/updateItem", async ({ id, updatedData }) => {
    const result = await productModel.update(id, updatedData);
    console.log(result);
    return { id, updatedData };
});

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
    await productModel.delete(id);
    return id;
});

export const uploadImage = createAsyncThunk("items/uploadImage", async ({ file, itemId, isCover }) => {
    await productModel.uploadImage(file, itemId, isCover).catch((err) => console.log(err));
    return itemId;
});

export const deleteImage = createAsyncThunk("items/deleteImage", async ({ url, itemId }) => {
    await productModel.deleteImage(url, itemId);
    return { url, itemId };
});

export const toggleCheckbox = createAsyncThunk("items/deleteImage", async ({ url, itemId }) => {
    await productModel.deleteImage(url, itemId);
    return { url, itemId };
});

export const uploadGalleryImage = createAsyncThunk("gallery/uploadGalleryImage", async (file) => {
    const result = await galleryModel.uploadImage(file).catch((err) => console.log(err));
    return result;
});

export const deleteGalleryImage = createAsyncThunk("gallery/deleteGalleryImage", async (url) => {
    await galleryModel.deleteImage(url);
    return url;
});

const itemsSlice = createSlice({
    name: "items",
    initialState: {
        items: [],
        gallery: [],
        status: "idle",
        error: null
    },
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchGallery.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGallery.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.gallery = action.payload;
            })
            .addCase(fetchGallery.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const { id, updatedData } = action.payload;
                const index = state.items.findIndex((item) => item.id === id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...updatedData };
                }
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteGalleryImage.fulfilled, (state, action) => {
                state.gallery = state.gallery.filter((item) => item !== action.payload);
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                const { itemId } = action.payload;
                const index = state.items.findIndex((item) => item.id === itemId);
                if (index !== -1) {
                    state.items[index].imgSources.push(action.payload.url);
                }
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                const { itemId, url } = action.payload;
                const index = state.items.findIndex((item) => item.id === itemId);
                if (index !== -1) {
                    state.items[index].imgSources = state.items[index].imgSources.filter((img) => img !== url);
                }
            })
            .addCase(uploadGalleryImage.fulfilled, (state, action) => {
                state.gallery.push(action.payload);
            });
    }
});

export default itemsSlice.reducer;
export const { setStatus } = itemsSlice.actions;
export const selectItemById = (state, itemId) => {
    return state.items.items.find((item) => item.id == itemId);
};

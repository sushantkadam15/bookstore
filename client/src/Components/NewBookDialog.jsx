import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Textarea
} from "@material-tailwind/react";

const NewBookDialog = ({ openNewBookDialog, handleOpen }) => {
    const [newBook, setNewBook] = useState({
        title: "",
        isbn: "",
        publishedDate: "",
        thumbnailUrl: "",
        shortDescription: "",
        authors: [],
    })



    const updateNewBookInfo = (key, newValue) => {
        setNewBook({
            ...newBook,
            [key]: newValue
        })
    }

    const handleNewBook = () => {
        const body = {
        }
    }


    return (
        <>
            <Button onClick={handleOpen}>Long Dialog</Button>
            <Dialog open={openNewBookDialog} handler={handleOpen}>
                <DialogHeader>Add Book</DialogHeader>
                <DialogBody className="h-[36rem] w-[80%] mx-auto mt-5 overflow-scroll flex flex-col gap-10">
                    <Input variant="standard" label="Book Title" required
                        onChange={(e) => { updateNewBookInfo("title", e.target.value) }}
                    />
                    <div>
                        <Input variant="standard" label="Authors" required />
                        <Typography
                            variant="small"
                            color="gray"
                            className="mt-2 flex items-center gap-1 font-normal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-mt-px h-4 w-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Use commas to add multiple authors.
                        </Typography>
                    </div>
                    <Input variant="standard" label="ISBN"
                        onChange={(e) => { updateNewBookInfo("isbn", e.target.value) }}

                    />
                    <Input variant="standard" label="Image URL"
                        onChange={(e) => { updateNewBookInfo("thumbnailUrl", e.target.value) }}
                    />
                    <Input type="date" variant="standard" label="Published Date" required />
                    <Textarea variant="standard" label="Description" onChange={(e) => { updateNewBookInfo("shortDescription", e.target.value) }} />
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="gradient" color="purple" onClick={handleNewBook} disabled={!(newBook.title && newBook.authors && newBook.publishedDate)}>
                        Add
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default NewBookDialog
import { useFavoriteUrls, useFavoriteUrlsDispatch } from "./_app"
import Modal from '../components/Modal'
import { useState } from 'react'
import Link from 'next/link'
import { FavoImage } from "../type/Type"

const FavoritePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [extendsImg, setExtendsImg] = useState();
    const urls = useFavoriteUrls()
    const urlsDispatch = useFavoriteUrlsDispatch();
    const extendImg = (e: any) => {
        const img = e.target.src
        setExtendsImg(img)
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false)
    }
    const deleteModal = () => {
        const newUrls: FavoImage[] = urls.favoImages.filter((favoImg) => favoImg.path !== extendsImg)
        urlsDispatch({ favoImages: newUrls });
        setShowModal(false);
    }
    return (
        <div>
            {showModal &&
                <Modal closeModal={closeModal} deleteModal={deleteModal}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={extendsImg} width={"auto"} height={"350px"} style={{ objectFit: "cover" }} />
                    </div>
                </Modal>}
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>秘蔵のねこたち</h1>
                    <Link href="/" style={{ margin: "35px 0 0 20px" }}>ねこ探しに戻る</Link>
                </div>
                <div style={{ marginLeft: "70px" }}>
                    {urls.favoImages.map((favimg) => (
                        <img key={favimg.id} src={favimg.path} width={250} height={250} style={{ objectFit: "cover", marginRight: "5px", cursor: "pointer" }} onClick={extendImg} />
                    ))}
                </div>
            </div>
            <div id="portal"></div>
        </div>
    )
}

export default FavoritePage
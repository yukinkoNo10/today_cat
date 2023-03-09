import Link from 'next/link'

const Header = () => {
    return (
        <div style={{display: "flex", justifyContent:"center"}}>
            <h1 style={{marginRight: 20}}>猫でぃくと</h1>
            <Link href="/favorite" style={{height: 50, marginTop: 35}}>推しねこはこちら</Link>
        </div>
    )
}

export default Header
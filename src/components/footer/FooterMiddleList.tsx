const FooterMiddleList = ({ title, listItem }: any) => {
    return (
        <div>
            <div>
                <h3 className="text-white text-base font-semibold mb-3">
                    {title}
                </h3>
                <ul className="flex flex-col gap-2">
                    {
                        listItem.map((item:any)=>item.listData.map((data:any,i:any)=>(
                            <li key={i} className="footerLink">{data}</li>
                        )))
                    }
                </ul>
            </div>
        </div>
    )
}

export default FooterMiddleList
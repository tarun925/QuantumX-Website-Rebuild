import Site from '../site';
export default async function Page({params}) { const {slug}=await params; return <Site path={slug}/> }

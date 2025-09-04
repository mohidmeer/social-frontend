


const Logo = ({size=400 , textOrientation}:{size:number , textOrientation:string}) => {

  return (
    <div className={`flex ${textOrientation} gap-2 items-center`}>
        
        <img src={'/images/logo.png'} 
         width={size} 
         />
        <p className='text-xl font-bold'>Social Mint</p>
    </div>
  )
}

export default Logo

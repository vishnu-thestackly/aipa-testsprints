import Vector from "../../assets/images/Vector.svg";
import Cancel from "../../assets/images/cancel.svg";
import Sparkle from "../../assets/images/Sparkle.svg";

const plans=[{price:"$0.00",duration:"/ month",title:"Free plan",features:["Culpa qui official","Deserunt mollitia an","Imi, id est laborum et","Dolorum fuga Et har","Um quidem rerum"],disabled:[3,4]},{price:"$99.00",duration:"/ monthly",title:"Basic plan",features:["Culpa qui official","Deserunt mollitia an","Imi, id est laborum et","Dolorum fuga Et har","Um quidem rerum"]},{price:"$999.00",duration:"/ yearly",title:"Premium plan",features:["Culpa qui official","Deserunt mollitia an","Imi, id est laborum et","Dolorum fuga Et har","Um quidem rerum"]}];

const PricingPlans=()=>{
return(
<section className="mt-16 lg:mt-24">
<div className="text-center">
<h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold text-[#2F2F2F] px-4">
Find the right plan to power your workflow.
</h2>

<p className="mt-4 w-full max-w-[900px] mx-auto px-4 text-[#586D93] text-[14px] md:text-[16px] leading-[24px] text-center">
Find a plan that fits your workflow and unlock access to premium features, faster performance, and enhanced productivity tools. Start with what you need today and scale confidently as your projects.
</p>

</div>

<div className="mt-12 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 justify-items-center gap-6 px-6 xl:px-12">            {plans.map((plan,index)=>(
<div key={index} className="bg-[#F8F8F8] rounded-[24px] p-4 xl:p-6 border border-[#D9D9D9] shadow-sm w-full max-w-[380px]">
    <div className="flex items-center flex-wrap">
<h1 className="text-[#4A63FF] font-bold text-[34px] sm:text-[40px] md:text-[22px] lg:text-[38px] xl:text-[45px]">    {plan.price}
</h1>

<span className="text-[#67728A] ml-2 text-[13px] sm:text-[14px] md:text-[16px]">
{plan.duration}
</span>
</div>

<h3 className="mt-5 text-[24px] sm:text-[30px] md:text-[22px] lg:text-[30px] xl:text-[36px] font-semibold text-black">{plan.title}
</h3>
<p className="text-[#67728A] text-[14px] md:text-[12px] lg:text-[14px] mt-2 whitespace-nowrap">Best plan for the fresher individuals</p>

<div className="w-full h-[1px] bg-[#E3E3E3] my-5"></div>

<div className="space-y-4">
{plan.features.map((item,i)=>(
<div key={i} className={`flex items-center gap-3 ${plan.disabled?.includes(i)?"text-[#B6B6B6]":"text-[#67728A]"}`}>
<img
src={plan.disabled?.includes(i)?Cancel:Vector}
alt=""
className="w-[16px] h-[16px]"
/>

<span className="text-[14px]">
{item}
</span>

</div>
))}
</div>

<button className="mt-8 mx-auto flex items-center justify-center gap-2 w-[145px] sm:w-[190px] lg:w-[165px] xl:w-[190px] h-[46px] lg:h-[44px] xl:h-[50px] rounded-full bg-[#4A63FF] text-white text-[14px] lg:text-[14px] xl:text-[16px]">Upgrade Plan
<img src={Sparkle} alt="" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
</button>

</div>
))}
</div>
</section>
)};

export default PricingPlans;


const Discount = () => {
    return (
        <div className="my-[50px]">
            <div className=" py-12 bg-gradient-to-r from-green-500 to-lime-400 dark:text-gray-50">
	<div className="container mx-auto">
		<div className="flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-6xl tracking-tighter font-bold">Up to
				<br  className="sm:hidden" /> 20% Off
			</h2>
			<div className="space-x-2 text-center py-2 lg:py-0">
				<span>Plus 24 hour refund policy</span>
				<span className="font-bold text-lg">Edura</span>
			</div>
			<a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600">Enroll now</a>
		</div>
	</div>
</div>

        </div>
    );
};

export default Discount;
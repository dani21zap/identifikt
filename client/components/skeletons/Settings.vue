<template>
	<b-form>
		<h3>Account information</h3>
		<div class="box">
			<div class="row">
				<div class="col-lg">
					<div>
						<b-form-group label="Company">
							<PuSkeleton height="30px"></PuSkeleton>
						</b-form-group>
						<div class="form-row">
							<div class="col-lg-6">
								<b-form-group label="Name">
									<PuSkeleton height="30px"></PuSkeleton>
								</b-form-group>
								<b-form-group label="Email">
									<PuSkeleton height="30px"></PuSkeleton>
								</b-form-group>
							</div>
							<div class="col-lg-6">
								<b-form-group label="Phone">
									<PuSkeleton height="30px"></PuSkeleton>
								</b-form-group>
								<b-form-group label="Country">
									<PuSkeleton height="30px"></PuSkeleton>
								</b-form-group>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<h4>Client Id</h4>
		<div class="box">
			<PuSkeleton height="30px"></PuSkeleton>
		</div>

		<div class="text-right">
			<PuSkeleton height="3rem" width="5rem"></PuSkeleton>
		</div>
	</b-form>
</template>

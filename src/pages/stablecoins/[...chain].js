import Layout from '~/layout'
import PeggedList from '~/components/PeggedList'
import { getPeggedOverviewPageData, revalidate } from '~/utils/dataApi'

export async function getStaticProps({
	params: {
		chain: [chain]
	}
}) {
	const props = await getPeggedOverviewPageData(chain)

	if (!props.filteredPeggedAssets || props.filteredPeggedAssets?.length === 0) {
		return {
			notFound: true
		}
	}
	return {
		props,
		revalidate: revalidate()
	}
}

export async function getStaticPaths() {
	const paths = []

	return { paths, fallback: 'blocking' }
}

export default function PeggedAssets({
	chains,
	filteredPeggedAssets,
	peggedAssetNames,
	chartData,
	peggedAreaChartData,
	peggedAreaMcapData,
	stackedDataset,
	peggedChartType,
	chain
}) {
	return (
		<Layout title={`Stablecoins Circulating - DefiLlama`} defaultSEO>
			<PeggedList
				chains={chains}
				selectedChain={chain}
				filteredPeggedAssets={filteredPeggedAssets}
				peggedAssetNames={peggedAssetNames}
				chartData={chartData}
				peggedAreaChartData={peggedAreaChartData}
				peggedAreaMcapData={peggedAreaMcapData}
				stackedDataset={stackedDataset}
				peggedChartType={peggedChartType}
			/>
		</Layout>
	)
}

---
{"dg-publish":true,"permalink":"/bioinformatics/my-r-package-collection/"}
---

# Pipeline
---
1. targets
	- Turn scripts into manageable pipeline
	- Automatically save and load important objects, and keep them in track
	- Very suitable for median or large projects
# Data
---
1. iSeq: [BioOmics/iSeq: Download sequencing data and metadata from GSA, SRA, EA, and DDBJ databases.](https://github.com/BioOmics/iSeq)
	- **iSeq** is a Bash script that allows you to download sequencing data and metadata from **[GSA](https://ngdc.cncb.ac.cn/gsa/)**, **[SRA](https://www.ncbi.nlm.nih.gov/sra/)**, **[ENA](https://www.ebi.ac.uk/ena/)**, and **[DDBJ](https://www.ddbj.nig.ac.jp/)** databases.
2. ggmagnify: [hughjonesd/ggmagnify: Create a magnified inset of part of a ggplot object](https://github.com/hughjonesd/ggmagnify)
	- ggmagnify creates a magnified inset of part of a [ggplot](https://ggplot2.tidyverse.org/) object. The magnified area can be a (rounded) rectangle, an ellipse, a convex hull of points, or an arbitrary shape. Borders can be drawn around the target area and the inset, along with projection lines and/or shading between the two. The inset can have a drop shadow. ![Pasted image 20250226164505.png](/img/user/appendix/Pasted%20image%2020250226164505.png)
# Analysis
---
## Common
1. genekitr: [🧬 Welcome to genekitr! | Genekitr: Gene Analysis Toolkit based on R](https://www.genekitr.fun/)
	- More visualization for ORA and GSEA results
	- Better gene ID conversion function
		- Automatically identify input type
		- Distinguish from symbol and alias
2. tidyomics: [tidyomics/tidyomics: Easily install and load packages from the tidyomcis ecosystem (github.com)](https://github.com/tidyomics/tidyomics)
	- A collection of packages for omics data analysis that are consistent with tidyverse ecosystem
## RNA-seq (bulk)
1. tidySummarizedExperiment: [Brings SummarizedExperiment to the Tidyverse �?tidySummarizedExperiment (stemangiola.github.io)](https://stemangiola.github.io/tidySummarizedExperiment/)
	- tidySummarizedExperiment provides a bridge between Bioconductor SummarizedExperiment and the tidyverse. It creates an invisible layer that <span style="background:rgba(240, 200, 0, 0.2)">enables viewing the Bioconductor SummarizedExperiment object as a tidyverse tibble, and provides SummarizedExperiment-compatible dplyr, tidyr, ggplot and plotly functions.</span> This allows users to get the best of both Bioconductor and tidyverse worlds.
2. tidybulk
	- Seamlessly integrated with `tidySummarizedExperiment`
	- Provide many out-of-box functions for bulk RNA-seq pipeline
## scRNA-seq
1. escape: [ncborcherding/escape: Easy single cell analysis platform for enrichment (github.com)](https://github.com/ncborcherding/escape)
	- The escape package allows users to easily incorporate multiple methods of GSEA and offers several visualization and analysis methods.
2. SeuratExtend: [huayc09/SeuratExtend](https://github.com/huayc09/SeuratExtend)
	- **Enhanced Data Visualization**: Includes heatmaps, violin plots, dimensional reduction (UMAP) plots, waterfall plots, dot plots, proportion bars, volcano plots, and GSEA plots.
	- **Integrated Functional and Pathway Analysis**: Supports GO and Reactome databases, with the option to use custom databases.
	- **Python Tool Integration**: Easily apply tools like scVelo, SCENIC, and Palantir within R using the Seurat object.
	- **Utility Functions**: Assorted functions for calculations and color selections to streamline your scRNA-seq analysis.
3. STCAT: [GuoBioinfoLab/STCAT: The single T cell annotation tool for scRNA-seq data](https://github.com/GuoBioinfoLab/STCAT)
	- STCAT is an automated T cell type annotation tool for scRNA-seq datasets. It based on a high-confidence T cell subtypes and states reference. The reference can be found in our TCellAtlas portal. STCAT can automatically annotate T cell subtypes and states for scRNA-seq data of different conditions and tissues.
4. cell2fate: [BayraktarLab/cell2fate: Inference of RNA velocity modules for prediction of cell fates and integration with spatial and regulatory models.](https://github.com/BayraktarLab/cell2fate)
	- Better than scVelo?
# Visualization
---
1. ggstatsplot: [ggplot2 Based Plots with Statistical Details �?ggstatsplot (indrajeetpatil.github.io)](https://indrajeetpatil.github.io/ggstatsplot/index.html)
	- Can automatically choose and perform statistical analysis, and depict it on plot
2. ggraph & tidyraph
	- Use tidyverse way to create network
3. tidyheatmaps
	- Use tidyverse way to create heatmaps
	- Support all features of `pheatmap`
4. ggsci: [Scientific Journal and Sci-Fi Themed Color Palettes for ggplot2 �?ggsci (nanx.me)](https://nanx.me/ggsci/index.html)
	- A collection of ggplot2 color palettes inspired by scientific journals and data visualization libraries
	- Only has up to 10 colors in each palette, and expanding the colors could be tricky
5. ggalign: [A ggplot2 Extension for Consistent Axis Alignment �?ggalign](https://yunuuuu.github.io/ggalign/)
	- Aligning and organizing multiple plots, particularly those that automatically reorder observations, such as dendrogram.
	- <span style="background:rgba(240, 200, 0, 0.2)">Alternative to ggheatmap and ComplexHeatmap</span>


---
{"dg-publish":true,"permalink":"/Bioinformatics/Convert between Seurat and AnnData/"}
---

# Seurat to AnnData
```r
# Currently scCustomize 3.0.0 is not released yet. You may want to use 
pak::pkg_install("samuel-marsh/scCustomize@release/3.0.0")
# to get the latest features
scCustomize::as.anndata(x = pbmc, file_path = "~/Desktop", file_name = "pbmc_anndata.h5ad")
```

# AnnData to Seurat
```R
sce <- schard::h5ad2seurat(h5ad_file_path)
```

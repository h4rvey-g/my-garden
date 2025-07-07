---
{"dg-publish":true,"permalink":"/bioinformatics/solutions-for-using-vs-code-remote-ssh-on-legacy-linux-systems/"}
---

Starting with VS Code 1.99 (March 2025), the pre-built server for VS Code only supports Linux distributions with **glibc 2.28 or later**, such as Debian 10, RHEL 8, or Ubuntu 20.04. On older Linux systems, you may encounter the error:
*"The remote host may not meet the glibc and libstdc++ prerequisites for the VS Code server."*

This guide explains how to make VS Code Remote-SSH work on unsupported systems (those without **glibc �?2.28** and **libstdc++ �?3.4.25**) by building a **sysroot**.

### **System Requirements**
VS Code 1.99.x requires:
- Kernel �?4.18
- glibc �?2.28
- libstdc++ �?3.4.25
- binutils �?2.29

**Note:** This is a **workaround** and not officially supported by Microsoft.

---

## **Two Methods to Obtain a Sysroot**

### **Method 1: Using glibc-all-in-one (Recommended)**
This method is simpler, using precompiled glibc libraries:

```bash
# Clone the repository
git clone https://github.com/matrix1001/glibc-all-in-one
cd glibc-all-in-one

# Update the list of available glibc versions
./update_list

# For CentOS, download glibc 2.28
# Check if 2.28 is available in old_list
cat old_list | grep 2.28

# Download the appropriate version (adjust based on your system)
./download_old 2.28-0ubuntu1_amd64

# Create a sysroot directory
mkdir -p ~/vscode-deps/sysroot/lib

# Copy required libraries
cp libs/2.28-0ubuntu1_amd64/libc-2.28.so ~/vscode-deps/sysroot/lib/
cp libs/2.28-0ubuntu1_amd64/ld-2.28.so ~/vscode-deps/sysroot/lib/
cp libs/2.28-0ubuntu1_amd64/lib*.so* ~/vscode-deps/sysroot/lib/
```

### **Method 2: Building Sysroot with Crosstool-ng (Official Method)**
If glibc-all-in-one doesn’t have your system version, use **Crosstool-ng**:

```bash
# Prepare a Docker environment
docker run -it --name vscode-sysroot ubuntu:latest bash

# Inside Docker, install dependencies
apt-get update
apt-get install -y sudo gcc g++ gperf bison flex texinfo help2man make libncurses5-dev \
python3-dev autoconf automake libtool libtool-bin gawk wget bzip2 xz-utils unzip \
patch rsync meson ninja-build

# Create a non-root user
useradd -m builder
echo "builder ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/builder
chown -R builder:builder /home/builder

# Switch to non-root user
su - builder

# Install crosstool-ng
wget http://crosstool-ng.org/download/crosstool-ng/crosstool-ng-1.26.0.tar.bz2
tar -xjf crosstool-ng-1.26.0.tar.bz2
cd crosstool-ng-1.26.0
./configure --prefix=/home/builder/crosstool-ng && make && make install
export PATH=$PATH:/home/builder/crosstool-ng/bin

# Download the config template
wget -O x86_64-gcc-8.5.0-glibc-2.28.config https://github.com/microsoft/vscode-linux-build-agent/raw/main/x86_64-gcc-8.5.0-glibc-2.28.config

# Modify the config (adjust kernel version)
# Example for CentOS 3.10.0:
# CT_GLIBC_MIN_KERNEL=3.10
# CT_LINUX_VERSION=3.10
# CT_LINUX_V_3_10=y

# Build the sysroot
mkdir -p ~/toolchain-dir
cd ~/toolchain-dir
cp ~/x86_64-gcc-8.5.0-glibc-2.28.config .config
ct-ng build

# Exit Docker and package the sysroot
exit

# Package the sysroot
cd /home/builder/x-tools/x86_64-unknown-linux-gnu/x86_64-unknown-linux-gnu/sysroot/
tar -czvf /tmp/sysroot.tar.gz lib/

# Copy from Docker to host
docker cp vscode-sysroot:/tmp/sysroot.tar.gz .

# Extract on the host
mkdir -p ~/vscode-deps/sysroot
tar -xzvf sysroot.tar.gz -C ~/vscode-deps/sysroot
```

---

## **Installing patchelf**
VS Code uses **patchelf** to apply the sysroot libraries.

**Note:** The latest version (0.18.0) may cause **Segmentation Fault**. Instead, use **0.16.1**:

```bash
# Download patchelf 0.16.1
wget https://github.com/NixOS/patchelf/releases/download/0.16.1/patchelf-0.16.1-x86_64-linux.tar.gz
tar -xzf patchelf-0.16.1-x86_64-linux.tar.gz

# Move patchelf to an accessible path
mkdir -p ~/vscode-deps/bin
cp patchelf-0.16.1-x86_64-linux/bin/patchelf ~/vscode-deps/bin/
```

---

## **Manually Configuring the VS Code Server**
Since the official patching method has bugs, we manually patch the server:

```bash
# 1. Find the latest stable commit ID (e.g., March 2025: 4437686ffebaf200fa4a6e6e67f735f3edf24ada)
git_cid="4437686ffebaf200fa4a6e6e67f735f3edf24ada"

# 2. Download the VS Code server
wget -O vscode-server.tar.gz "https://update.code.visualstudio.com/commit:${git_cid}/server-linux-x64/stable"

# 3. Extract to the target folder
mkdir -p ~/.vscode-server/cli/servers/Stable-${git_cid}/server
tar -xzf vscode-server.tar.gz -C ~/.vscode-server/cli/servers/Stable-${git_cid}/server --strip-components=1

# 4. Patch the binary
~/vscode-deps/bin/patchelf --set-interpreter /home/$(whoami)/vscode-deps/sysroot/lib/ld-2.28.so \
                         --set-rpath /home/$(whoami)/vscode-deps/sysroot/lib \
                         --force-rpath \
                         ~/.vscode-server/cli/servers/Stable-${git_cid}/server/node

# 5. Skip VS Code's server check
touch /tmp/vscode-skip-server-requirements-check
```

---

## **Connecting to the Remote Host**
After completing these steps, use **VS Code Remote-SSH** to connect. You may see an "unsupported" warning, but the server should work.

### **Notes:**
- Adjust paths according to your environment.
- Ensure all required libraries are in the sysroot.
- If issues persist, check VS Code logs.

**References:**
- [VS Code Remote FAQ](https://code.visualstudio.com/docs/remote/faq#_can-i-run-vs-code-server-on-older-linux-distributions)
- [Chinese Guide](https://zhuanlan.zhihu.com/p/681393388)


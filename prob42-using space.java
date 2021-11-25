class Solution {
    public int trap(int[] arr) {
        int n=arr.length;
        int[]left=new int[n];
        int[]right=new int[n];
        int lmax=0,rmax=0;
        for(int i=0;i<n;i++){
            lmax=Math.max(lmax,arr[i]);
            left[i]=lmax;
        }
        for(int i=n-1;i>=0;i--){
            rmax=Math.max(rmax,arr[i]);
            right[i]=rmax;
        }
        int c=0;
        for(int i=0;i<n;i++){
            c+=Math.max(rmax[i],lmax[i])-arr[i];
        }
        return c;
    }
}
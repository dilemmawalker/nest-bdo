class Solution {
    public int trap(int[] arr) {
        int n=arr.length;
        int lp=0,rp=n-1;
        int c=0;
        int lmax=0,rmax=0;
        while(lp<rp){
            lmax=Math.max(lmax,arr[lp]);
            rmax=Math.max(rmax,arr[rp]);

            if(lmax<=rmax){
                c+=lmax-arr[lp];
                lp++;
            }
            else{
                c+=rmax-arr[rp];
                rp--;
            }
        }
        return c;
    }
}
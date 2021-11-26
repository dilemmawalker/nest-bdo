class Solution {
    public int maxProduct(int[] arr) {
        int n=arr.length;
        int left=1,right=1;
        int ans=Integer.MIN_VALUE;
        for(int i=0;i<n;i++){
            int a=arr[i];
            if(left==0)
            left=1;
            if(right==0)
            right=1;
            left*=a;
            right*=arr[n-1-i];

            ans=Math.max(ans,Math.max(left,right));
        }
        return ans;
    }
}
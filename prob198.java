class Solution {
    public int rob(int[] arr) {
        int n=arr.length;
        int[]dp=new int[n];
        if(n==1){
            return arr[0];
        }
        else if(n==2){
            return Math.max(arr[0],arr[1]);
        }
        else if(n==3){
            return Math.max(arr[1],(arr[0]+arr[2]));
        }
        for(int i=n-1;i>=0;i--){
            if(i==n-1 || i==n-2){
                dp[i]=arr[i];
                continue;
            }
            if(i==n-3){
                dp[i]=arr[i]+arr[i+2];
                continue;
            }
            dp[i]=arr[i]+Math.max(dp[i+2],dp[i+3]);
        }
        return Math.max(dp[0],dp[1]);
    }
}
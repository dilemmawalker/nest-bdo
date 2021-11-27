class Solution {
    public int rob(int[] arr) {
        int n=arr.length;
        
        if(n==0)
        return 0;
        else if(n==1)
        return arr[0];
        else if(n==2)
        return Math.max(arr[0],arr[1]);
        
        return Math.max(frame(arr,0,n-2),frame(arr,1,n-1));
    }
    public int frame(int[]arr,int s,int e){
        int n=arr.length;
        int[]dp=new int[n];
        for(int i=e;i>=s;i--){
            int a=arr[i];
            if(i==e || i==e-1 || i==e-2){
                if(i==e-2)
                dp[i]=arr[i]+arr[i+2];
                else
                dp[i]=arr[i];
                continue;
            }
            dp[i]=arr[i]+Math.max(dp[i+2],dp[i+3]);
        }
        return Math.max(dp[s],dp[s+1]);
    }
}
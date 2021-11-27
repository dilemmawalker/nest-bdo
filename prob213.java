class Solution {
    public int rob(int[] arr) {
        int n=arr.length;
        int[]dp=new int[n];
        if(n==0)
        return 0;
        else if(n==1)
        return arr[0];
        else if(n==2)
        return Math.max(arr[0],arr[1]);
        for(int i=n-1;i>=0;i--){
            int a=arr[i];
            if(i==n-1||i==n-2 || i==n-3){
                if(i==n-3)
                dp[i]=arr[i]+arr[i+2];
                else
                dp[i]=arr[i];
                continue;
            }
            dp[i]=arr[i]+Math.max(dp[i+2],dp[i+3]);
        }
        int ans=Math.max(dp[0]-arr[0],dp[1]);
        int[]temparr=new int[n];
        //
        int temp=arr[n-1];
        for(int i=0;i<n-1;i++){
            temparr[i+1]=arr[i];
        }
        temparr[0]=temp;
        //
        for(int i=0;i<n;i++){
            arr[i]=temparr[i];
            // System.out.print(arr[i]+" ");
        }
        //shifted all houses one index forward.
        
        for(int i=0;i<n;i++)
            dp[i]=0;
        for(int i=n-1;i>=0;i--){
            int a=arr[i];
            if(i==n-1||i==n-2 || i==n-3){
                if(i==n-3)
                dp[i]=arr[i]+arr[i+2];
                else
                dp[i]=arr[i];
                continue;
            }
            dp[i]=arr[i]+Math.max(dp[i+2],dp[i+3]);
        }
        ans=Math.max(ans,Math.max(dp[0]-arr[0],dp[1]));
        return ans;
    }
}
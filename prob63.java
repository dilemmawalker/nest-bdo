class Solution {
    public int uniquePathsWithObstacles(int[][] arr) {
        int n=arr.length;
        int m=arr[0].length;
        if(arr[0][0]==1 || arr[n-1][m-1]==1)
            return 0;
        return sol(arr,n,m);
    }
    public int sol(int[][]arr,int n,int m){
        int[][]dp=new int[n][m];
        
        for(int i=n-1;i>=0;i--){
            for(int j=m-1;j>=0;j--){
                if(i==n-1 && j==m-1 && arr[i][j]==0){
                    dp[i][j]=1;
                    continue;
                }
                int res=0;
                if(i+1<n && arr[i+1][j]==0)
                    res+=dp[i+1][j];
                if(j+1<m && arr[i][j+1]==0)
                    res+=dp[i][j+1];
                
                dp[i][j]=res;
            }
        }
        return dp[0][0];
    }
}